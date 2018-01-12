import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent implements OnInit {


  constructor( ) { }

  ngOnInit() {
    setTimeout(() => {
      console.log('redirecting to home');
    }, 2000);
  }

}
