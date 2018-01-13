import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.sass']
})

export class FavComponent implements OnInit {

  @Output() favTrigger = new EventEmitter();

  flag = true;
  @Input() inFav;

  constructor() { }

  ngOnInit() {
    if (this.inFav) {
      this.flag = false;
    }
  }

  fav() {
    if (this.flag) {
      this.favTrigger.emit(1);
      this.flag = !this.flag;
      // console.log('make fav');
    }
    else {
      this.favTrigger.emit(0);
      this.flag = !this.flag;
      // console.log('remove fav');
    }
  }

}
