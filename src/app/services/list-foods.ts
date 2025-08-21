import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { ProductDetailList } from '../interfaces/product-info';

@Injectable({
  providedIn: 'root'
})
export class ListFoodsService {
  public url = 'https://world.openfoodfacts.org'
  public lisfFood$ = new BehaviorSubject<Array<ProductDetailList>>(null)

  constructor(
    private http: HttpClient
  ){}

  public getProductByBarcode(code: string): Observable<any> {
    return this.http.get(`${this.url}/api/v2/product/${code}?fields=product_name,brands_tags`);
  }

  public getProductImage(barcode: string): Observable<any> {
    const barcodeRegex =  /^(\d{3})(\d{3})(\d{3})(\d+)$/
    const barcodeFormated = barcode.replace(barcodeRegex, "$1/$2/$3/$4")
    return this.http.get(`${this.url}/images/products/${barcodeFormated}/front_pt.1.full.jpg`)
  }
  
  // public searchByName(term: string): Observable<any> {
  //   return this.http.get(`https://world.openfoodfacts.net/cgi/search.pl?search_terms=${term}&search_simple=1&action=process&json=1`);
  // }
}
