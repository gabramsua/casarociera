import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-propuesta-detail',
  templateUrl: './propuesta-detail.component.html',
  styleUrl: './propuesta-detail.component.scss'
})
export class PropuestaDetailComponent {

  tabIndex: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const tab = this.route.snapshot.queryParamMap.get('tab');
    this.tabIndex = tab ? parseInt(tab, 10) : 0;
  }
}
