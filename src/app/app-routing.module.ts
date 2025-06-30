import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingSelectorUsuarioComponent } from './pages/landing-selector-usuario/landing-selector-usuario.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
  path: '',
  component: LandingSelectorUsuarioComponent
},
{
  path: 'home',
  component: HomeComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
