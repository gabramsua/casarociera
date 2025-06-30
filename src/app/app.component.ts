import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'casarociera';
  

  public auth_service: AuthService = new AuthService;
  
  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn() && this.router.url === '/') {
      this.router.navigate(['/home']);
    }
  }
}
