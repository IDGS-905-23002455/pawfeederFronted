import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';
import { HomeComponent } from './components/home/home';
import { About} from './components/about/about';
import { Contact } from './components/contact/contact';
import { Manual } from './components/manual/manual';
import { Pets } from './components/pets/pets';
import { Profile} from './components/profile/profile';
import { Schedules } from './components/schedules/schedules';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: About },
  { path: 'contacto', component: Contact },
  { path: 'manual', component: Manual },

  { path: 'registro', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'mascotas', component: Pets },
  { path: 'perfil', component: Profile},
  { path: 'horarios', component: Schedules },
  { path: '**', redirectTo: '' }
];
