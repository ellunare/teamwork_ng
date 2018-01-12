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

  temp_desk_name = '';
  // Сохраняем перед редактированием для проверки на изменение
  current_section_name = '';
  current_section_description = '';

  parent_color = '';

  constructor(
    private sectionsService: SectionsService,
    private desksService: DesksService,
    private projectsService: ProjectsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Получаем ID из маршрута
    this.activatedRoute.params.subscribe((values: { id: number }) => {
      this.id = values.id;
    })
    this.getSectionInfo();
    this.getDesks();
    this.getParentColor();
  }

  // Переключатель формы добавления доски для секции
  toggleMode(mode) {
    // Добавляем доску
    if (mode == 'add_desk') {
      this.temp_desk_name = '';
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
  getSectionInfo() {
    let response = this.sectionsService.getSection(this.id);

    console.log(response.message);
    if (response.response) {
      this.section = response.data;
    }
  }

  // Сохраняем после редактирования
  saveEdit() {
    let flag = true;

    // Валидность
    if (this.current_section_name == this.section.name) {
      flag = false;
    }
    if (this.current_section_description == this.section.description) {
      flag = false;
    }
    if (!flag) {
      console.log('Same lines');
    }
    else {
      let response = this.sectionsService.saveEdit(this.section);

      console.log(response.message);
      if (response.response) {
        setTimeout(() => {
          this.toggleMode('edit_section');
        }, 500);
      }
    }
  }

  // Удаляем секцию по ID
  deleteSection() {
    let response = this.sectionsService.deleteSection(this.id);

    console.log(response.message);
    if (response.response) {
      setTimeout(() => {
        this.close();
      }, 500);
    }
  }

  close() {
    this.router.navigate([
      'dash',
      'project', this.section.parentProjectId
    ]);
  }

  // Получаем доски
  getDesks() {
    let response = this.desksService.getDesks(this.id);

    console.log(response.message);
    if (response.response) {
      this.desks = response.data;
    }
  }

  // Создаем доску
  createDesk() {
    if (!this.temp_desk_name) {
      console.log('write desk line');
    }
    else {
      // Отправляем данные
      let data = {
        id: -999,
        line: this.temp_desk_name,
        parentSectionId: this.id
      }

      let response = this.desksService.createDesk(data);

      console.log(response.message);
      if (response.response) {
        this.toggleMode('add_desk');
        data.id = response.id;
        // На клиенте - добавляем в массив
        this.desks.push(data);
      }
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

  getParentColor() {
    this.parent_color = this.projectsService.getColor(this.section.parentProjectId);
  }


}
