import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminGuard } from './core/admin.guard';
import { UserGuard } from './core/user.guard';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';


const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full' },
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard]},
  { path: 'user-space', component: UserPageComponent, canActivate: [UserGuard]},
  { path: 'home', component: HomePageComponent},
  { path: 'car-detail/:id', component: DetailsPageComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


