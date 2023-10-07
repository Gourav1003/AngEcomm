import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { AppRoutingModule } from './app-routing.module';
import { CartInfoComponent } from './components/cart-info/cart-info.component';
import { TitleComponent } from './components/title/title.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { DefaultButtonComponent } from './components/additional/default-button/default-button.component';
import { InputContainerComponent } from './components/additional/input-container/input-container.component';
import { InputValidationComponent } from './components/additional/input-validation/input-validation.component';
import { TextInputComponent } from './components/additional/text-input/text-input.component';
import { AuthorizationInterceptor } from './authoriation.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductInfoComponent,
    CartInfoComponent,
    TitleComponent,
    LoginPageComponent,
    SignupPageComponent,
    DefaultButtonComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    })
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthorizationInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
