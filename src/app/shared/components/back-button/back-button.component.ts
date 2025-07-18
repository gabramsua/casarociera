import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'back-button',
    templateUrl: './back-button.component.html',
    styleUrls: ['./back-button.component.scss'],
    standalone: false
})
export class BackButtonComponent {
  @Input() route!: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
  
  goTo(){
    const tabIndex = this.activatedRoute.snapshot.queryParamMap.get('tab');
    this.router.navigate([this.route], { queryParams: { tab: tabIndex } });
  }
}
