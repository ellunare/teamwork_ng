import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { SectionsService } from '../../../-services/sections.service';

@Component({
  selector: 'section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.sass']
})
export class SectionListComponent implements OnInit {

  sections = [];

  @Input() parentProjectId;

  wait = false;
  add_mode = false;
  temp_name = '';
  temp_description = '';

  constructor(
    private _sectionsService: SectionsService
  ) { }

  ngOnInit() {
    this.x_getSections();
  }

  // Переключатель формы добавления проекта команде
  toggleAddingMode() {
    this.temp_name = '';
    this.temp_description = '';
    this.add_mode = !this.add_mode
  }

  // Получаем секции
  x_getSections() {
    this._sectionsService.x_getSections(this.parentProjectId)
      .subscribe(res => {
        console.log(res.msg);
        if (res.success) {
          console.log(res.data);
          this.sections = res.data;
        }
      })

    // console.log(response.message);
    // if (response.response) {
    //   this.sections = response.data;
    // }
  }

  // Создаем секцию
  createSection() {
    if (!this.temp_name || !this.temp_description) {
      console.log('Write some section data');
    }
    else {
      this.wait = true;

      let data = {
        name: this.temp_name,
        description: this.temp_description,
        parent: this.parentProjectId
      }

      let response = this._sectionsService.createSection(data);

      console.log(response.message);
      if (response.response) {
        setTimeout(() => {
          this.x_getSections();
          this.wait = false;
          this.toggleAddingMode();
        }, 1000);
      }
    }
  }

}
