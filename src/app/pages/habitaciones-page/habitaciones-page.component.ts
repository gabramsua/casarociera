import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-habitaciones-page',
  templateUrl: './habitaciones-page.component.html',
  styleUrls: ['./habitaciones-page.component.scss']
})
export class HabitacionesPageComponent {

  selectedTabIndex = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const tabFromParams = this.route.snapshot.queryParamMap.get('tab');
    if (tabFromParams) {
      this.selectedTabIndex = parseInt(tabFromParams, 10);
    }
  }
}
