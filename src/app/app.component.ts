import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { fadeAnimation } from './shared/animations/fadeAnimation';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  public auth_service: AuthService = new AuthService;
  loading: boolean = false;
  
  constructor(
    private auth: AuthService, 
    private router: Router, 
    private loaderService: CommonService,
    private cdRef: ChangeDetectorRef) {
      if (this.auth.isLoggedIn() && this.router.url === '/') {
        this.router.navigate(['/home']);
      }
  }
  
  ngOnInit(): void {
    this.loaderService.loading$.subscribe((loading) => {
      this.loading = loading;
      this.cdRef.detectChanges();
    });
  }
  prepareRoute(outlet: RouterOutlet): string | null | undefined{
    return outlet?.activatedRoute?.routeConfig?.path ?? null;
  }

}
