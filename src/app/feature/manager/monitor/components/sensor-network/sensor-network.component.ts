import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { MonitoringService } from '../../service/monitoring.service';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { MatDialog } from '@angular/material/dialog';
import { SignInStationComponent } from '../sign-in-station/sign-in-station.component';

@Component({
  selector: 'app-sensor-network',
  templateUrl: './sensor-network.component.html',
  styleUrls: ['./sensor-network.component.scss']
})
export class SensorNetworkComponent {
  temperatureList: any = [[[]]];
  sizeStorage: any = {long: 60, height: 40, width: 20};
  minTemperature: number = 0;
  maxTemperature: number = 0;
  averageTemperature: number = 0;
  nameStorage: string = '';

  sensorList3D: any = [];

  checkConnectIoTLab: boolean =  false; //kiem tra da ket noi trạm cam bien chua
  isLoading: boolean = true;
  
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
    // this.monitoring_sv.checkLoginIoTLab(6).subscribe((res: any) => {
    //   if(res.length==0) {
    //     this.checkConnectIoTLab = false;
    //     this.openDialog();
    //   } else {
    //     this.checkConnectIoTLab = true;
    //     this.getTemperatureList();
    //   }
    // })
    // this.getTemperatureList();
    // this.main();
    this.getListSensor();
  }

  getTemperatureList() {
    this.monitoring_sv.getStorageInfo(6).subscribe((storageInfo: any) => {
      this.sizeStorage.length = storageInfo.storage_length;
      this.sizeStorage.width = storageInfo.storage_width;
      this.sizeStorage.height = storageInfo.storage_height;
      this.nameStorage = storageInfo.storage_name;
      this.getListSensor();
      setTimeout(() => {
        this.main();
        this.isLoading=false;
      }, 2000)
    })
  }


  main() {
    console.log("main: ", this.temperatureList);
    const canvas: any = document.querySelector('#sensorscene');
    console.log("canvas: ", canvas);
    const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
    renderer.setSize(window.innerWidth, 700);

    const camera = new THREE.PerspectiveCamera(10, window.innerWidth/window.innerHeight, 1, 1000);

    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 75;
    camera.position.x = 100;
    camera.position.y = 100;
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
    group.position.set(0, 0, 0);

    const boxWidth = 50;
    const boxHeight = 50;
    const boxDepth = 50;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeCube(boxWidth: any, boxHeight: any, boxDepth: any, color: any, x: any, y: any, z: any) {
      const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

      const material = new THREE.MeshPhongMaterial({ color });
      material.depthTest = false;
      
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

    makeCube(this.sizeStorage.long/10, this.sizeStorage.height/10, this.sizeStorage.width/10, 'hsl(105, 100%, 50%, 20%)', 1, 1, 1);
    makeCube(1, 1, 1, 'hsl(105, 100%, 50%)', 1, 1, 1);
    this.sensorList3D.forEach((item: any) => {
      makeCube(0.1, 0.1, 0.1, 'red', item.location.x, item.location.y, item.location.z);
    })
  }

  getListSensor() {
    this.monitoring_sv.getListSensor(6).subscribe((data: any) => { //this.localstorage_sv.getItem('storage').id
      console.log("list of sensor: ", data);
      this.sensorList3D = data;
      this.sensorList3D.forEach((sensor: any) => {
        sensor.location = this.exchangeCoordinate({x: sensor.sensor_x, y: sensor.sensor_y, z: sensor.sensor_z});
      })
    })
  }

  exchangeCoordinate(coordinate: {x: number, y: number, z: number}) {
    var kq: any = {x: 1, y: 0, z:0};
    console.log("size storage: ", this.sizeStorage);
    console.log("coordinate: ", coordinate);
    
    var centerPoint: any = {x: (this.sizeStorage.long-1)/2, y: (this.sizeStorage.width-1)/2, z: (this.sizeStorage.height-1)/2}
    if(coordinate.x > centerPoint.x) {
      kq.x = coordinate.x/10 - centerPoint.x/10 - 0.05;
    }
    else {
      kq.x = coordinate.x/10 - centerPoint.x/10 - 0.05 + 0.1;
    }

    if(coordinate.y > centerPoint.y) {
      kq.z = coordinate.y/10 - centerPoint.y/10 - 0.05;
    }
    else {
      kq.z = coordinate.y/10 - centerPoint.y/10 - 0.05 + 0.1;
    }

    if(coordinate.z > centerPoint.z) {
      kq.y = coordinate.z/10 - centerPoint.z/10 - 0.05;
    }
    else {
      kq.y = coordinate.z/10 - centerPoint.z/10 - 0.05 + 0.1;
    }
    kq = [parseFloat(kq.x),parseFloat(kq.y),parseFloat(kq.z)];
    console.log("exchange: ", kq);
    return kq;
  }
}
