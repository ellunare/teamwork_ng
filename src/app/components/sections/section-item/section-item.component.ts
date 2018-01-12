import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'section-item',
  templateUrl: './section-item.component.html',
  styleUrls: ['./section-item.component.sass']
})
export class SectionItemComponent implements OnInit {

  @Input() section;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  navigate() {
    this.router.navigate([
      'dash',
      'project', this.section.parentProjectId,
      'section', this.section.id
    ]);
  }

}
