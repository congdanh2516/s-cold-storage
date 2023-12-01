import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { MonitoringService } from '../../service/monitoring.service';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { MatDialog } from '@angular/material/dialog';
import { SignInStationComponent } from '../sign-in-station/sign-in-station.component';

@Component({
  selector: 'app-temperature-monitoring',
  templateUrl: './temperature-monitoring.component.html',
  styleUrls: ['./temperature-monitoring.component.scss']
})
export class TemperatureMonitoringComponent {

  temperatureList: any = [[[]]];
  sizeStorage: any = {};
  minTemperature: number = 0;
  maxTemperature: number = 0;
  averageTemperature: number = 0;
  nameStorage: string = '';

  checkConnectIoTLab: boolean =  true; //kiem tra da ket noi trạm cam bien chua

  @ViewChild('cubescene') cubeScene: ElementRef;
  
  constructor(private monitoring_sv: MonitoringService, public dialog: MatDialog) {
      // this.openDialog();
  }
  openDialog() : void {
    const dialogRef = this.dialog.open(SignInStationComponent, { disableClose: true });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  ngOnInit () {
    // this.main();
    this.getTemperatureList();
  }

  getTemperatureList() {
    this.monitoring_sv.getStorageInfo(6).subscribe((storageInfo: any) => {
      this.sizeStorage.length = storageInfo.storage_length;
      this.sizeStorage.width = storageInfo.storage_width;
      this.sizeStorage.height = storageInfo.storage_height;
      this.nameStorage = storageInfo.storage_name;
      this.monitoring_sv.cubeSceneTemperatureList(6).subscribe((data: any) => {
        this.minTemperature = Math.ceil(data.minimun_temperature);
        this.maxTemperature = Math.ceil(data.maximun_temperature);
        this.averageTemperature = Math.ceil(data.average_temperature);
        console.log("cube scene temperature list: ", data);
        this.temperatureList = data.temperatures;
        this.main();
      })
    })
  }


  main() {
    console.log("main: ", this.temperatureList);
    const canvas: any = document.querySelector('#cubescene');
    console.log("canvas: ", canvas);
    const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
    renderer.setSize(window.innerWidth, 700);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 75;
    camera.position.x = 250;
    camera.position.y = 80;
    camera.rotation.set(0.5, 0.4, 0.2);

    controls.update();

    const scene = new THREE.Scene();  

    // scene.background = new THREE.Color( 0x000000 );

    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(0, 10, 0);
    const light2 = new THREE.DirectionalLight(0xffffff, 0.8);
    light2.position.set(-10, 4, -10);
    const light3 = new THREE.DirectionalLight(0xffffff, 0.8);
    light3.position.set(10, 4, 10);
    scene.add(light1);
    scene.add(light2);
    scene.add(light3);

    animate();
    function animate() {
      requestAnimationFrame( animate );
      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();
      renderer.render(scene, camera);
    }

    const group = new THREE.Group();
    scene.add(group);
    group.position.set(5, 5, 0);

    const boxWidth = 5;
    const boxHeight = 5;
    const boxDepth = 5;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeCube(geometry: any, color: any, x: any, y: any, z: any) {
      const material = new THREE.MeshPhongMaterial({ color });
      
      const cube = new THREE.Mesh(geometry, material);
      cube.castShadow = true;
      cube.receiveShadow = true;
      // scene.add(cube);
      group.add(cube);
  
      cube.position.x = x;
      cube.position.y = y;
      cube.position.z = z;
  
      return cube;
    }

    for(let x = 0; x <= this.sizeStorage.length; x++) { // 80
      for(let y = 0; y <= this.sizeStorage.width; y++) { // 60
        for(let z = 0; z <= this.sizeStorage.height; z++) { // 40
          if(this.temperatureList[x][y][z] != '#') {
            makeCube(geometry, this.getHue(this.temperatureList[x][y][z]), x, z, y);
          }
        }
      }
    }

    // makeCube(geometry, 'hsl(105, 100%, 50%)', 1, 1, 1);
    // makeCube(geometry, 'hsl(105, 100%, 50%)', 1, 1, -1);
  }

  getHue(nowTemp: any) {
    if(nowTemp == '#') {
      return 'white';
    }
    var maxHsl = 240; // maxHsl maps to max temp (here: 20deg past 360)
    var minHsl = 30; //  minhsl maps to min temp counter theo chiều kim đồng hồ (clickwise)
    var rngHsl = maxHsl - minHsl;
  
    var maxTemp = this.maxTemperature; //
    var minTemp = this.minTemperature; //
    
    var rngTemp = maxTemp - minTemp; // 125
    var degCnt = maxTemp - nowTemp; // 0
    var hslsDeg = rngHsl / rngTemp;  //210 / 125 = 1.68 Hsl-degs to Temp-degs
    var returnHue = (360 - ((degCnt * hslsDeg) - (maxHsl - 360))); 
    return `hsl(${returnHue},100%, 50%)`;
  }

}
