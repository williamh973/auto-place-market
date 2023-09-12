import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminGuard } from './core/admin.guard';
import { UserGuard } from './core/user.guard';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { UserPageComponent } from './pages/user-space/user-page/user-page.component';
import { ConceptPageComponent } from './pages/concept-page/concept-page.component';
import { AuthGuard } from './core/auth.guard';


const routes: Routes = [
  { 
    path: '', 
    redirectTo:'/home', 
    pathMatch: 'full' 
  },
  { 
    path: 'user-space', 
    component: UserPageComponent, 
    canActivate: [AuthGuard]
  },
  { 
    path: 'home', 
    component: HomePageComponent
  },
  { 
    path: 'concept', 
    component: ConceptPageComponent
  },
  { 
    path: 'car-detail/:id', 
    component: DetailsPageComponent 
  },
  { 
    path: '**', 
    component: ErrorPageComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


