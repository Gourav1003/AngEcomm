import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../shared/Models/products';
import { CartItem } from '../shared/Models/cartItem';
import { Cart } from '../shared/Models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = new Cart();
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  addToCart(product:Product):void{
    let cartItem = this.cart.items.find(item =>item.product.title===product.title);
    if(cartItem)
    return;

    this.cart.items.push(new CartItem(product));

    this.setCartToLocalStorage();
  }

  removeFromCart(productTitle:string):void{
    this.cart.items = this.cart.items.filter(item=>item.product.title !=productTitle);

    this.setCartToLocalStorage();
  }

  changeQuantity(productTitle:string, quantity:number){
    let cartItem = this.cart.items.find(item=>item.product.title === productTitle);

    if(!cartItem) return;

    cartItem.quantity=quantity;
    cartItem.price=quantity*cartItem.product.price;

    this.setCartToLocalStorage();

  }

  clearCart(){
    this.cart = this.getCartFromLocalStorage();
    this.setCartToLocalStorage();
  }

  getCartObsrvable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }

}
