import { Component, OnInit, Input } from '@angular/core';
import { Mesh } from 'three';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input()color: string = '#232b38';
  @Input()size: string = '70px';

  @Input()cube: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
}
