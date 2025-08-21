import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { CommonModule } from '@angular/common';
import { ProductDetailList, ProductInfo } from '../../interfaces/product-info';
import { ListFoodsService } from '../../services/list-foods';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-storage-list',
  standalone: true,
  imports: [Navbar, CommonModule],
  templateUrl: './storage-list.html',
  styleUrl: './storage-list.scss'
})
export class StorageList implements OnInit, AfterViewInit{
  
  public foodList:  Observable<Array<ProductDetailList>> 

  constructor(
    private readonly listFoodsService: ListFoodsService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
   this.foodList = this.listFoodsService.lisfFood$
  }
  ngAfterViewInit(): void {
    window.scrollTo(0,0)
  }

  getClassByExpiration(dateString: string): string {
    const today = new Date();
    const expiration = new Date(dateString);

    const diffTime = expiration.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return 'gray';
    } else if (diffDays <= 3) {
      return 'red';
    } else if (diffDays <= 7) {
      return 'orange';
    } else if (diffDays <= 15) {
      return 'yellow';
    } else {
      return 'green';
    }
  }

  getDaysLeft(dateString: string): number {
    const today = new Date();
    const expiration = new Date(dateString);

    const diffTime = expiration.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  public redirectToNewProduct(): void {
    this.router.navigate(['register-food'])
  }

  public backToRegisterFood(item: ProductDetailList): void {
    this.listFoodsService.selectedFood$.next(item)
    this.router.navigate(['register-food'])
  }

  public removeItemList(item: number): void {
    const listaAtual = this.listFoodsService.lisfFood$.value; 
    const novaLista = listaAtual.filter((_, i) => i !== item); // remove item
    this.listFoodsService.lisfFood$.next(novaLista); // 🔹 emite nova lista
  }
}
