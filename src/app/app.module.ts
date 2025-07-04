import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { LandingSelectorUsuarioComponent } from './pages/landing-selector-usuario/landing-selector-usuario.component';
import { HomeComponent } from './pages/home/home.component';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TurnosPageComponent } from './pages/turnos-page/turnos-page.component';
import { HabitacionesPageComponent } from './pages/habitaciones-page/habitaciones-page.component';
import { BalancePageComponent } from './pages/balance-page/balance-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { GastosHorizontalListComponent } from './components/gastos-horizontal-list/gastos-horizontal-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageDialogComponent } from './shared/components/image-dialog/image-dialog.component';

registerLocaleData(localeEs, 'es'); // Registrar el locale 'es'

@NgModule({ 
    declarations: [
        AppComponent,
        LandingSelectorUsuarioComponent,
        HomeComponent,
        BottomNavComponent,
        TurnosPageComponent,
        HabitacionesPageComponent,
        BalancePageComponent,
        AdminPageComponent,
        SpinnerComponent,
        GastosHorizontalListComponent,
        ImageDialogComponent
    ],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        RouterModule,
        MatCardModule,
        MatDialogModule,
    ], 
    providers: [
        { provide: LOCALE_ID, useValue: 'es' },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
