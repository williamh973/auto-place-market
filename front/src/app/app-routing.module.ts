import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminGuard } from './core/admin.guard';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';


const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full' },
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard]},
  { path: 'home', component: HomePageComponent},
  // { path: 'card-detail/:id', component: DetailsPageComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


