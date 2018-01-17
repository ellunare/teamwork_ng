import {
  Component,
  OnInit
} from '@angular/core';

import { SectionsService } from '../../../-services/sections.service';
import { DesksService } from '../../../-services/desks.service';
import { ProjectsService } from '../../../-services/projects.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'section-one',
  templateUrl: './section-one.component.html',
  styleUrls: ['./section-one.component.sass']
})

export class SectionOneComponent implements OnInit {

  id;

  section;
  desks = [];

  wait = {
    section: false,
    desk: false
  }

  mode = {
    edit_section: false,
    add_desk: false
  }

  temp_desk_line = '';
  // Сохраняем перед редактированием для проверки на изменение
  current_section_name = '';
  current_section_description = '';

  parent_color = '';

  render_info = false;

  constructor(
    private _sectionsService: SectionsService,
    private _desksService: DesksService,
    private _projectsService: ProjectsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.render_info = false;
    // Получаем ID из маршрута
    this.activatedRoute.params.subscribe((values: { id: number }) => {
      this.id = values.id;
    })
    this.x_getSectionInfo();
    this.x_getDesks();
  }

  // Переключатель формы добавления доски для секции
  toggleMode(mode) {
    // Добавляем доску
    if (mode == 'add_desk') {
      this.temp_desk_line = '';
      this.mode.add_desk = !this.mode.add_desk;
    }
    // Редактируем секцию
    if (mode == 'edit_section') {
      this.current_section_name = this.section.name;
      this.current_section_description = this.section.description;
      this.mode.edit_section = !this.mode.edit_section;
    }
  }

  // Получаем инфу о текущей секции по ID
  x_getSectionInfo() {
    this._sectionsService.x_getSection(this.id)
      .subscribe(res => {
        if (res.success) {
          this.section = res.data;
          this.x_getParentColor();
        }
        else {
          this.router.navigate([
            'error'
          ]);
        }
      });
  }

  // Сохраняем после редактирования
  x_saveEdit() {
    // Валидность
    let flag = true;
    if (this.current_section_name == this.section.name && this.current_section_description == this.section.description) {
      flag = false;
    }
    if (!flag) {
      console.log('Same lines');
    }
    else {
      this._sectionsService.x_saveEdit(this.section)
        .subscribe(res => {
          // console.log(res.msg);
          if (res.success) {
            this.toggleMode('edit_section');
          }
        });
    }
  }

  // Удаляем секцию по ID
  x_deleteSection() {
    let flag = confirm('Sure?');
    if (flag) {
      // Удаляем секцию
      this._sectionsService.x_deleteSection(this.id)
        .subscribe(res => {
          // console.log(res.msg);
          if (res.success) {
            this.close();
            // Удаляем все дочерние эл-ты?
            //
          }
        });
    }
  }

  close() {
    this.router.navigate([
      'dash',
      'project', this.section.parentProjectId
    ]);
  }

  // Получаем доски
  x_getDesks() {
    this._desksService.x_getDesks(this.id)
      .subscribe(res => {
        // console.log(res.msg);
        if (res.success) {
          this.desks = res.data;
        }
      });
  }

  // Создаем доску
  x_createDesk() {
    if (!this.temp_desk_line) {
      console.log('write desk line');
    }
    else {
      // Отправляем данные
      let data = {
        id: -999,
        line: this.temp_desk_line,
        parentSectionId: this.id
      }

      this._desksService.x_createDesk(data)
        .subscribe(res => {
          console.log(res.msg);
          if (res.success) {
            this.toggleMode('add_desk');
            // На клиенте - добавляем в массив
            this.desks.push(res.data);
          }
        });
    }
  }

  navigate(id) {
    this.router.navigate([
      'dash',
      'project', this.section.parentProjectId,
      'section', this.section.id,
      'desk', id
    ]);
  }

  x_getParentColor() {
    this._projectsService.x_getProject(this.section.parentProjectId)
      .subscribe(res => {
        // console.log(res.msg);
        if (res.success) {
          this.parent_color = res.data.color;
        }
        else {
          this.parent_color = '#6d6639';
        }
        this.render_info = true;
      })
  }


}
