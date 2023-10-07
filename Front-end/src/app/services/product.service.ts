import { Injectable } from '@angular/core';
import { Product } from '../shared/Models/products';
import { sample_Data } from 'src/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PRODUCTS_URL } from '../shared/Links/urls';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Product[]>{
    return this.http.get<Product[]>(PRODUCTS_URL);
  }

  getProductByName(productTitle:string){
    
    return this.http.get<Product[]>(PRODUCTS_URL+'/'+productTitle);
  }
}
