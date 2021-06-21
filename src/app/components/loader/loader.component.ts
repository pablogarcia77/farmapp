import { Component, Input, OnInit } from '@angular/core';
import { SplashAnimationType } from '../splash-animation-type';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {


  showSplash = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.showSplash = false;
    }, 10000);
  }
}
