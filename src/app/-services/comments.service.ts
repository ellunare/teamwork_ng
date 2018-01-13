import { Injectable } from '@angular/core';

import { SharedService } from './shared.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CommentsService {

  url = 'http://127.0.0.1:3000/api/comments';

  constructor(
    private _http: Http,
    private _ss: SharedService
  ) { }

  // Отдаем один комментарий по ID комента
  x_getComment(id) {
    return this._http.get(this.url + '/comment/' + id, this._ss._headers())
      .map(res => res.json());
  }

  // Отдаем комментарии по ID таска родителя
  x_getComments(id) {
    return this._http.get(this.url + '/task/' + id, this._ss._headers())
      .map(res => res.json());
  }

  x_createComment(data) {
    return this._http.post(this.url + '/create', data, this._ss._headers())
      .map(res => res.json());
  }

  x_saveEdit(comment) {
    return this._http.put(this.url + '/edit', comment, this._ss._headers())
      .map(res => res.json());
  }

  x_deleteComment(id) {
    return this._http.delete(this.url + '/delete/' + id, this._ss._headers())
      .map(res => res.json());
  }

}
