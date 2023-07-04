import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TokenInterceptorInterceptor } from './core/token-interceptor.interceptor';
import { FormsModule } from '@angular/forms';
import { FeatRegisterFormComponent } from './components/features/feat-register-form/feat-register-form.component';
import { TrackTokenStateComponent } from './components/features/track-token-state/track-token-state.component';
import { TrackHttpStatusComponent } from './components/features/track-http-status/track-http-status.component';
import { GetDatasComponent } from './get-datas/get-datas.component';

import { ReactiveFormsModule } from '@angular/forms';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FeatNavbarComponent } from './components/features/feat-navbar/feat-navbar.component';
import { FeatFooterComponent } from './components/features/feat-footer/feat-footer.component';
import { FeatSearchComponent } from './components/features/feat-search/feat-search.component';
import { FeatCardComponent } from './components/features/feat-card/feat-card.component';
import { FeatCardListComponent } from './components/features/feat-card-list/feat-card-list.component';
import { FeatEditCardFormComponent } from './components/features/feat-edit-card-form/feat-edit-card-form.component';
import { FeatSignUpComponent } from './components/features/feat-sign-up/feat-sign-up.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { FeatAccountPopupComponent } from './components/features/feat-account-popup/feat-account-popup.component';
import { FeatConfirmDeletePopupComponent } from './components/features/feat-confirm-delete-popup/feat-confirm-delete-popup.component';
import { FeatNoCardsFoundComponent } from './components/features/feat-no-cards-found-popup/feat-no-cards-found-popup.component';



@NgModule({
  declarations: [
    AppComponent,
    DetailsPageComponent,
    HomePageComponent,
    ErrorPageComponent,
    FeatNavbarComponent,
    FeatFooterComponent,
    FeatSearchComponent,
    FeatCardComponent,
    FeatCardListComponent,
    FeatEditCardFormComponent,
    FeatRegisterFormComponent,
    FeatSignUpComponent,
    AdminPageComponent,
    FeatAccountPopupComponent,
    FeatConfirmDeletePopupComponent,
    FeatNoCardsFoundComponent,
    TrackTokenStateComponent,
    TrackHttpStatusComponent,
    GetDatasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
