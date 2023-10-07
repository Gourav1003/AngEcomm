import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/Models/cart';
import { CartItem } from 'src/app/shared/Models/cartItem';
import { AuthService  } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-info',
  templateUrl: './cart-info.component.html',
  styleUrls: ['./cart-info.component.css']
})
export class CartInfoComponent implements OnInit{
  totalCount=0
  totalPrice=0
  cart:any;
  responseData:any
  constructor(private cartService:CartService,
    private authService : AuthService,
    private http : HttpClient,
    private router : Router){
    // this.cartService.getCartObsrvable().subscribe((cart)=>{
    //   this.cart = cart;
    // })
  }

  ngOnInit(){
    const token = this.authService.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
    }

    const url = 'http://localhost:3000/cart';

    this.http
      .get(url)
      .pipe(
        catchError((error) => {
          console.error('Error sending POST request', error);
          throw error;
        })
      )
      .subscribe((response) => {
        console.log('POST request successful', response);
        this.responseData = response;
        this.cart = this.responseData;
        for(let item in this.cart.items){
          this.totalCount = this.totalCount+this.cart.items[item].quantity
          this.totalPrice = this.totalPrice+this.cart.items[item].quantity*this.cart.items[item].product.price
        }
        const product = this.cart.product;
        console.log(product);
      });
  }



  changeQuantity(cartItem:CartItem,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.product.title, quantity);
  }
  removeFromCart(id:any) {
    console.log(id);
    this.cart.items = this.cart.items.filter((item:any) => item.product._id != id);
    this.totalCount=0
    this.totalPrice=0
    for(let item in this.cart.items){
      this.totalCount = this.totalCount+this.cart.items[item].quantity
      this.totalPrice = this.totalPrice+this.cart.items[item].quantity*this.cart.items[item].product.price
    }
    const PostData = {
      itemId: id,
    };
    console.log(PostData);
    const url = 'http://localhost:3000/cart/products/delete';

    this.http
      .post(url, PostData)
      .pipe(
        catchError((error) => {
          console.error('Error sending POST request', error);
          throw error;
        })
      )
      .subscribe((response) => {
        console.log('POST request successful', response);
      });
  
}

}
