import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ValidationMessageModule } from './validation-message/validation-message.module';
import { ErrorPageComponent } from './player/layout/error-page/error-page.component';
import { TosterComponent } from './player/layout/toster/toster.component';
import { DOM_UTIL } from 'core/utils/dom-util';

// import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
// import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";


// const config = new AuthServiceConfig([
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider('419119176620-aimk08fqkkl30pi7f572qft3evrbq2p5.apps.googleusercontent.com')
//   }

// ]);
// export function provideConfig() {
//   return config;
// }
@NgModule({
  declarations: [
    AppComponent,
    TosterComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ValidationMessageModule,

    
  ],
  providers: [DOM_UTIL,   
  //   {
  //   provide: AuthServiceConfig,
  //   useFactory: provideConfig
  // }
],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class AppModule { }
