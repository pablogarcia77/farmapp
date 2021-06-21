import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmaciasComponent } from './admin/farmacias/farmacias.component';
import { LoginComponent } from './admin/login/login.component';
import { PanelComponent } from './admin/panel/panel.component';
import { TurnosComponent } from './admin/turnos/turnos.component';
import { MapsComponent } from './components/maps/maps.component';

const routes: Routes = [
  { path: '', component: MapsComponent },
  { path: 'admin', component: LoginComponent },
  { path: 'admin/panel', component: PanelComponent,
    children: [
      {path: '', component: FarmaciasComponent},
      {path: 'farmacias', component: FarmaciasComponent},
      {path: 'turnos', component: TurnosComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
