import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

import { LandingSelectorUsuarioComponent } from './pages/landing-selector-usuario/landing-selector-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { HabitacionesPageComponent } from './pages/habitaciones-page/habitaciones-page.component';
import { TurnosPageComponent } from './pages/turnos-page/turnos-page.component';
import { BalancePageComponent } from './pages/balance-page/balance-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { GastosHorizontalListComponent } from './components/gastos-horizontal-list/gastos-horizontal-list.component';
import { ComidasHorizontalListComponent } from './components/comidas-horizontal-list/comidas-horizontal-list.component';
import { PropuestasHorizontalListComponent } from './components/propuestas-horizontal-list/propuestas-horizontal-list.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { ImageDialogComponent } from './shared/components/image-dialog/image-dialog.component';
import { PropuestasListComponent } from './pages/habitaciones-page/propuestas-list/propuestas-list.component';
import { PropuestasCreateComponent } from './pages/habitaciones-page/propuestas-create/propuestas-create.component';
import { HabitacionesListComponent } from './pages/habitaciones-page/habitaciones-list/habitaciones-list.component';

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
        ComidasHorizontalListComponent,
        PropuestasHorizontalListComponent,
        ImageDialogComponent,
        HabitacionesPageComponent,
        PropuestasListComponent,
        PropuestasCreateComponent,
        HabitacionesListComponent
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
        MatTabsModule,
        MatTableModule,
    ], 
    providers: [
        { provide: LOCALE_ID, useValue: 'es' },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
