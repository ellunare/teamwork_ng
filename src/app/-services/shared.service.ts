import { Injectable } from '@angular/core';

import { Headers } from '@angular/http';

@Injectable()

export class SharedService {

  constructor() { }

  private x_loadToken() {
    const token = localStorage.getItem('id_token');
    return token;
  }

  _headers(...opts) {
    let headers = new Headers();
    headers.append('Authorization', this.x_loadToken());

    // Если стоит флаг 'j'
    opts.forEach(o => {
      if (o === "j") {
        headers.append('Content-Type', 'application/json');
      }
    });

    return { headers: headers };
  }

}
