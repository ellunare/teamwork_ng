import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'e404',
  templateUrl: './e404.component.html',
  styleUrls: ['./e404.component.sass']
})

export class E404 implements OnInit {

  constructor( ) { }

  ngOnInit() {
    setTimeout(() => {
      console.log('redirecting to home');
    }, 2000);
  }

}
