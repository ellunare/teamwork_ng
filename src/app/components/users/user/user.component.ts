import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  @Input() id;
  @Input() name;
  @Input() avatar;

  constructor() { }

  ngOnInit() {
  }


}
