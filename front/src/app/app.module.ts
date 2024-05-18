import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TokenInterceptorInterceptor } from './core/token-interceptor.interceptor';
import { FormsModule } from '@angular/forms';
import { FeatRegisterFormComponent } from './components/features/form/feat-register-form/feat-register-form.component';
import { TrackHttpStatusComponent } from './components/features/popup/track-http-status/track-http-status.component';
import { GetUserDatasComponent } from './components/features/user/feat-get-user-datas/feat-get-user-datas.component';
   
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsPageComponent } from './components/pages/details-page/details-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ErrorPageComponent } from './components/pages/error-page/error-page.component';
import { FeatNavbarComponent } from './components/ui/feat-navbar/feat-navbar.component';
import { FeatFooterComponent } from './components/features/feat-footer/feat-footer.component';
import { FeatSearchComponent } from './components/ui/feat-search/feat-search.component';
import { FeatCardComponent } from './components/features/card/feat-card/feat-card.component';
import { FeatCardListComponent } from './components/features/card/feat-card-list/feat-card-list.component';
import { FeatEditCardFormComponent } from './components/features/form/feat-edit-card-form/feat-edit-card-form.component';
import { FeatSignInFormComponent } from './components/features/form/feat-sign-in-form/feat-sign-in-form.component';
import { FeatAccountPopupComponent } from './components/features/popup/feat-account-popup/feat-account-popup.component';
import { FeatConfirmDeletePopupComponent } from './components/features/popup/confirmation/feat-confirm-delete-popup/feat-confirm-delete-popup.component';
import { FeatNoCardsFoundComponent } from './components/features/popup/feat-no-cards-found-popup/feat-no-cards-found-popup.component';
import { FeatCardAdminComponent } from './components/features/card/feat-card-admin/feat-card-admin.component';
import { UserPageComponent } from './components/pages/user-space/user-page/user-page.component';
import { FeatCardUserComponent } from './components/features/card/feat-card-user/feat-card-user.component';
import { Step1Component } from './components/features/form/feat-edit-card-form/step1/step1.component';
import { Step2Component } from './components/features/form/feat-edit-card-form/step2/step2.component';
import { FeatCardFavoriteComponent } from './components/features/card/feat-card-favorite/feat-card-favorite.component';
import { FeatConfirmUpdateCardPopupComponent } from './components/features/popup/feedback/card/feat-confirm-update-card-popup/feat-confirm-update-card-popup.component';
import { FeatConfirmDeleteCurrentUserPopupComponent } from './components/features/popup/confirmation/feat-confirm-delete-current-user-popup/feat-confirm-delete-current-user-popup.component';
import { ConceptPageComponent } from './components/pages/concept-page/concept-page.component';
import { FavoriteStatusService } from './shared/services/favorite-status.service';
import { FeatCardPreviewComponent } from './components/features/card/feat-card-preview/feat-card-preview.component';
import { FeatLoaderComponent } from './components/features/popup/feat-loader/feat-loader.component';
import { FeatCardOperationStatusComponent } from './components/features/popup/feedback/feat-card-operation-status/feat-card-operation-status.component';
import { NavbarResponsiveTabletComponent } from "./components/ui/feat-navbar/navbar-responsive-tablet/navbar-responsive-tablet.component";
import { FeatContactPopupComponent } from './components/features/popup/feat-contact-popup/feat-contact-popup.component';
import { SearchResponsiveTabletComponent } from './components/ui/feat-search/search-responsive-tablet/search-responsive-tablet.component';
import { SearchResponsiveSmartphoneComponent } from './components/ui/feat-search/search-responsive-smartphone/search-responsive-smartphone.component';
import { FeatMessageHistoryComponent } from './components/features/user/feat-message-history/feat-message-history.component';
import { FeatReceivedMessagesComponent } from './components/features/user/feat-received-messages/feat-received-messages.component';
import { FeatDropDownMenuComponent } from './components/pages/user-space/feat-drop-down-menu/feat-drop-down-menu.component';
import { FeatDisabledUsersListComponent } from './components/features/user/feat-disabled-users-list/feat-disabled-users-list.component';
import { FeatUserPersonnalInformationComponent } from './components/features/user/feat-user-personnal-information/feat-user-personnal-information.component';
import { FeatUpdateInformationFormComponent } from './components/features/form/feat-update-information-form/feat-update-information-form.component';
    
  
   
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
    FeatSignInFormComponent,
    FeatAccountPopupComponent,
    FeatConfirmDeletePopupComponent,
    FeatNoCardsFoundComponent,
    TrackHttpStatusComponent,
    GetUserDatasComponent,
    FeatCardAdminComponent,
    UserPageComponent,
    FeatCardUserComponent,
    Step1Component,
    Step2Component,
    FeatCardFavoriteComponent,
    FeatConfirmUpdateCardPopupComponent,
    FeatConfirmDeleteCurrentUserPopupComponent,
    ConceptPageComponent,
    FeatCardPreviewComponent,
    FeatLoaderComponent,
    FeatCardOperationStatusComponent,
    NavbarResponsiveTabletComponent,
    FeatContactPopupComponent,
    SearchResponsiveTabletComponent,
    SearchResponsiveSmartphoneComponent,
    FeatMessageHistoryComponent,
    FeatReceivedMessagesComponent,
    FeatDropDownMenuComponent,
    FeatDisabledUsersListComponent,
    FeatUserPersonnalInformationComponent,
    FeatUpdateInformationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    NgxDropzoneModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorInterceptor,
      multi: true,
    },
    FavoriteStatusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
