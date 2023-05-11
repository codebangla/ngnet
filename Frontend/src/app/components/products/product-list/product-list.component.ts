import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product-service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;

  products: Product[] = [];
  selectedProductId: number | null = null;


  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error retrieving products:', error);
      }
    );
  }
  editProduct(productId: number): void {
    this.router.navigate(['/product-edit', productId]);
  }
  setProductIdToDelete(productId: number): void {
    this.selectedProductId = productId;
  }


  deleteProduct(): void {
    if (this.selectedProductId !== null) {
      this.productService.deleteProduct(this.selectedProductId).subscribe(
        () => {
          // Product deleted successfully, update the product list
          this.getProducts();
          this.selectedProductId = null; // Clear the selected product ID
          this.closebutton.nativeElement.click();
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }

}
