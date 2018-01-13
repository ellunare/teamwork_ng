import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import { projectColors } from './_colors';

@Component({
  selector: 'color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.sass']
})
export class ColorComponent implements OnInit {

  colors = projectColors;

  @Output() colorSelected = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  setColor(color_index) {
    this.colorSelected.emit(this.colors[color_index][1]);
  }

}
