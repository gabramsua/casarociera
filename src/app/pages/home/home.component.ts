import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveEvento } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import Constants from 'src/constants';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent {
  activeEvento: ActiveEvento | undefined;
  
  constructor(private auth: AuthService, private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAllByCasa(Constants.END_POINTS.ACTIVE_EVENTO).subscribe((data) => {
      this.activeEvento = data;
    });
  }
  
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
