import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
   user=false
  cartQuantity = 0;
  constructor(cartService:CartService,
    private authService: AuthService,
    private router: Router){
      if(this.authService.getAuthToken()){
        this.user=true
      }
    cartService.getCartObsrvable().subscribe((newCart)=>{
      this.cartQuantity = newCart.totalCount;
    })
  }

  ngOnInit(): void {
    
  }

  logout(){
    this.authService.logout();
    
    this.router.navigate(['/']);
    this.user= false
  }

}
