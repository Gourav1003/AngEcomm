import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/Models/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  products: Product[] = [];

  constructor(private productService:ProductService,activatedRoute:ActivatedRoute){
    let productsObservable:Observable<Product[]>;
    activatedRoute.params.subscribe((params)=>{
      // console.log(params.productTitle)
      if(params.productTitle){
      productsObservable= this.productService.getProductByName(params.productTitle);
      }
      else{
    
      productsObservable=productService.getAll();

      }
      productsObservable.subscribe((serverProducts)=>{
      this.products=serverProducts;
    })
    })
  }

  ngOnInit():void{

  }

}
