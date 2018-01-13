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
  @Output() block_scroll = new EventEmitter();

  this_comment;

  // Автор комментария для имени и иконки
  parent_user;
  // Мой комментарий?
  id_active;

  edit_mode = false;
  wait = false;

  render = false;

  constructor(
    private _commentsService: CommentsService,
    private _usersService: UsersService
  ) { }

  ngOnInit() {
    this.render = false;
    this.id_active = this._usersService.getID();
    this.x_getComment();
  }

  // Получаем комментарий по ID
  x_getComment() {
    this._commentsService.x_getComment(this.id)
      .subscribe(res => {
        // console.log(res.msg);
        if (res.success) {
          this.this_comment = res.data;
          this.x_getUser();
        }
      });
  }

  // Получаем автора комментария по ID автора
  x_getUser() {
    this._usersService.x_getUserInfo(this.this_comment.parentUserId)
      .subscribe(res => {
        // console.log(res);
        this.parent_user = res.data;
        this.render = true;
      });
  }

  // Переключатель формы редактирования комментария
  toggleAddingMode() {
    this.edit_mode = !this.edit_mode
    this.block_scroll.emit(this.edit_mode);
  }

  x_saveEdit() {
    this._commentsService.x_saveEdit(this.this_comment)
      .subscribe(res => {
        // console.log(res.msg);
        if (res.success) {
          this.toggleAddingMode();
        }
      });
  }

  x_deleteComment() {
    let flag = confirm('Sure?');
    if (flag) {
      // Удаляем коммент
      this._commentsService.x_deleteComment(this.this_comment.id)
        .subscribe(res => {
          // console.log(res.msg);
          if (res.success) {
            // Говорим таску удалить этот комментарий у себя
            this.deleted.emit(this.this_comment.id);
          }
        });
    }
  }

}
