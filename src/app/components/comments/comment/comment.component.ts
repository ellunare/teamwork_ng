import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CommentsService } from '../../../-services/comments.service';
import { UsersService } from '../../../-services/users.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass']
})

export class CommentComponent implements OnInit {

  @Input() id;
  @Output() deleted = new EventEmitter();

  this_comment;

  // Автор комментария для имени и иконки
  parent_user;
  // Мой комментарий?
  id_active;

  edit_mode = false;
  wait = false;

  render = false;

  constructor(
    private commentsService: CommentsService,
    private _usersService: UsersService
  ) { }

  ngOnInit() {
    this.id_active = this._usersService.getID();
    this.getComment();
    this.x_getUser();
  }

  // Получаем комментарий по ID
  getComment() {
    let response = this.commentsService.getComment(this.id);

    console.log(response.message);
    if (response.response) {
      this.this_comment = response.data;
    }
  }

  // Получаем автора комментария по ID автора
  x_getUser() {
    this._usersService.x_getUserInfo(this.this_comment.parentUserId)
      .subscribe(res => {
        this.parent_user = res.data;
        this.render = true;
      });
  }

  // Переключатель формы редактирования комментария
  toggleAddingMode() {
    this.edit_mode = !this.edit_mode
  }

  saveEdit() {
    this.wait = true;
    this.toggleAddingMode();

    let response = this.commentsService.saveEdit(this.this_comment);

    console.log(response.message);
    if (response.response) {
      setTimeout(() => {
        this.wait = false;
      }, 1000);
    }
  }

  deleteComment() {
    this.wait = true;

    let response = this.commentsService.deleteComment(this.this_comment);

    console.log(response.message);
    if (response.response) {
      setTimeout(() => {
        // Говорим таску удалить этот комментарий у себя
        this.deleted.emit(this.this_comment);
        this.wait = false;
      }, 1000);
    }
  }

}
