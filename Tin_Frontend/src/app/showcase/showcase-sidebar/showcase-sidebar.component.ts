import { Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {NouisliderComponent} from 'ng2-nouislider';
import {FormsModule} from '@angular/forms';
import {isPlatformBrowser, NgIf} from '@angular/common';



@Component({
  selector: 'app-showcase-sidebar',
  standalone: true,
  imports: [
    NouisliderComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './showcase-sidebar.component.html',
  styleUrl: './showcase-sidebar.component.css'
})
export class ShowcaseSidebarComponent implements OnInit {

  sliderConfig: any;

  sliderModel: number[];
  public isBrowser!: boolean;


  constructor (@Inject(PLATFORM_ID) private platformId: Object) {
    this.sliderConfig = {
      connect: true,
      step: 1,
      range: {
        min: 0,
        max: 50
      }
    };

    this.sliderModel = [0, 0];
  }
  ngOnInit () {
    this.isBrowser = isPlatformBrowser(this.platformId);
    console.log(this.platformId);
    this.sliderModel = [10,20];
  }}
