import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { fadeAnimation } from './shared/animations/fadeAnimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  public auth_service: AuthService = new AuthService;
  
  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn() && this.router.url === '/') {
      this.router.navigate(['/home']);
    }
  }
  
  prepareRoute(outlet: RouterOutlet): string | null | undefined{
    return outlet?.activatedRoute?.routeConfig?.path ?? null;
  }

}
