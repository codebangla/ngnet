import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productId!: number;
  form!: FormGroup;
  product!: Product;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.productService.getProduct(this.productId).subscribe((data: Product)=>{
      this.product = data;
    });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      price: ['', [Validators.required, Validators.pattern(/^\$?\d+(,\d{3})*(\.\d{2})?$/)]],
      quantity: [null, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const product: Product = {
      id: this.productId,
      name: this.f['name'].value,
      description: this.f['description'].value,
      price: this.f['price'].value,
      quantity: this.f['quantity'].value,
    };

    this.productService.updateProduct(product).subscribe(updatedProduct => {
      console.log('Product updated:', updatedProduct);
      this.router.navigate(['/']);
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
