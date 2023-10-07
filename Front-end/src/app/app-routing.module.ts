import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { HomeComponent } from './components/home/home.component';
import { CartInfoComponent } from './components/cart-info/cart-info.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';

const routes:Routes=[
  {path:'',component:HomeComponent},
  {path:'product/:productTitle',component:ProductInfoComponent},
  {path:'cart-page',component:CartInfoComponent},
  {path:'login',component:LoginPageComponent},
  {path:'signup',component:SignupPageComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
