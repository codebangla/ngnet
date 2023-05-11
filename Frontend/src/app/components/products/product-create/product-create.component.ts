import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router)
    { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: '',
      price: ['', [
        Validators.required,
        Validators.pattern(/^\$?\d+(,\d{3})*(\.\d{2})?$/)
      ]],
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

    this.productService.createProduct(this.form.value).subscribe(
      (result) => {
        console.log('Product added successfully!', this.form.value);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
