import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingSelectorUsuarioComponent } from './pages/landing-selector-usuario/landing-selector-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { TurnosPageComponent } from './pages/turnos-page/turnos-page.component';
import { HabitacionesPageComponent } from './pages/habitaciones-page/habitaciones-page.component';
import { BalancePageComponent } from './pages/balance-page/balance-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingSelectorUsuarioComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'turnos',
    component: TurnosPageComponent
  },
  {
    path: 'habitaciones',
    component: HabitacionesPageComponent
  },
  {
    path: 'balance',
    component: BalancePageComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
