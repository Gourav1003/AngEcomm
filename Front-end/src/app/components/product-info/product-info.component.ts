import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/Models/products';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit{
  productTitle:any
  product:any;

  constructor(activatedRoute:ActivatedRoute,productService:ProductService,
    private cartService:CartService,private router:Router,
    private authService:AuthService,
    private http:HttpClient){
    activatedRoute.params.subscribe((params)=>{
      console.log(params.productTitle)
      if(params.productTitle){
      productService.getProductByName(params.productTitle).subscribe(serverProducts =>{
           this.product = serverProducts
           this.productTitle = params.productTitle
          console.log(this.product)
      });
      
    }
    })

    
  }

  ngOnInit(): void {
    
  }

  addToCart(){
    const token = this.authService.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
    }

    const PostData = {
      title: this.productTitle
    };
    console.log(PostData);
    const url = 'http://localhost:3000/cart/products';

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

        alert('Item Added to Cart.');
      });
  }
  }
