import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

@Component({
  selector: 'project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.sass']
})
export class ProjectListItemComponent implements OnInit {

  @Input() name;
  @Input() description;
  @Input() color;

  constructor() { }

  ngOnInit() {
  }

  setColor() {
    return this.color;
  }

}
