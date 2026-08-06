import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';
import { HomeComponent } from './components/home/home';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Manual } from './components/manual/manual';
import { Faq } from './components/faq/faq';
import { Pets } from './components/pets/pets';
import { Profile } from './components/profile/profile';
import { Schedules } from './components/schedules/schedules';
import { Admin } from './components/admin/admin';
import { Reviews } from './components/reviews/reviews';
import { rolGuard } from './guards/auth.guard';
import { InventarioComponent } from './components/inventario/inventario';
import { InventarioDispensadoresComponent } from './components/inventario-dispensadores/inventario-dispensadores';
import { ProveedoresComponent } from './components/proveedores/proveedores';
import { RecetasComponent } from './components/recetas/recetas';
import { DashboardClienteComponent } from './components/dashboard-cliente/dashboard-cliente';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: About },
  { path: 'contacto', component: Contact },
  { path: 'manual', component: Manual },
  { path: 'preguntas-frecuentes', component: Faq },
  { path: 'opiniones', component: Reviews },
  { path: 'registro', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'admin', component: Admin, canActivate: [rolGuard('admin')] },
  { path: 'dashboard', component: DashboardAdminComponent, canActivate: [rolGuard('admin')] },
  { path: 'inventario', component: InventarioComponent, canActivate: [rolGuard('admin')] },
  { path: 'inventario-dispensadores', component: InventarioDispensadoresComponent, canActivate: [rolGuard('admin')] },
  { path: 'proveedores', component: ProveedoresComponent, canActivate: [rolGuard('admin')] },
  { path: 'recetas', component: RecetasComponent, canActivate: [rolGuard('admin')] },
  { path: 'mascotas', component: Pets, canActivate: [rolGuard('cliente')] },
  { path: 'perfil', component: Profile, canActivate: [rolGuard('cliente')] },
  { path: 'horarios', component: Schedules, canActivate: [rolGuard('cliente')] },
  { path: 'dashboard-cliente', component: DashboardClienteComponent, canActivate: [rolGuard('cliente')] },
  { path: '**', redirectTo: '' }
];


