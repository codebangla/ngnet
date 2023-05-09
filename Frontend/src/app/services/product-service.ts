import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];

  constructor() {
    this.loadSampleProducts();
  }

  private loadSampleProducts(): void {
    const sampleProducts: Product[] = [
      { id: 1, name: 'Product 1', description: 'Description 1', price: 10 },
      { id: 2, name: 'Product 2', description: 'Description 2', price: 20 },
      { id: 3, name: 'Product 3', description: 'Description 3', price: 30 },
    ];

    this.products = sampleProducts;
  }

  getProducts(): Product[] {
    return this.products;
  }

}
