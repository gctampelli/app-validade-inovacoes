import { Component, OnInit } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { CommonModule } from '@angular/common';
import { ProductDetailList, ProductInfo } from '../../interfaces/product-info';
import { ListFoodsService } from '../../services/list-foods';

@Component({
  selector: 'app-storage-list',
  standalone: true,
  imports: [Navbar, CommonModule],
  templateUrl: './storage-list.html',
  styleUrl: './storage-list.scss'
})
export class StorageList implements OnInit{
  
  public foodList:  Array<ProductDetailList> = []

  constructor(
    private readonly listFoodsService: ListFoodsService
  ) {}

  ngOnInit(): void {
   this.listFoodsService.lisfFood$.subscribe((resp) => {
    this.foodList = resp
    console.log(this.foodList, 'passei')
    })
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
}
