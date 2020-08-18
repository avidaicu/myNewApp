import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from './product';
import { ProductService } from './product.service';
import { AuthService } from '../auth/auth.service';

import { Subscription } from 'rxjs';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  // _listFilter = '';
  // get listFilter(): string {
  //   return this._listFilter;
  // }
  // set listFilter(value: string) {
  //   this._listFilter = value;
  //   this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  // }

  // filteredProducts: Product[] = [];
  products: Product[] = [];
  subscription: Subscription;


  constructor(private productService: ProductService,
              private authService: AuthService) { }

  // performFilter(filterBy: string): Product[] {
  //   filterBy = filterBy.toLocaleLowerCase();
  //   return this.products.filter((product: Product) =>
  //     product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  // }

  // toggleImage(): void {
  //   this.showImage = !this.showImage;
  // }

  ngOnInit(): void {
    this.subscription = this.productService.getProducts()
    .subscribe((products: Product[]) => {
      this.products = products;
      // this.initializeTable(products); // Initializing data-table here
    });
  }



    // Implementing ngOnDestroy() as we need the subscription to be there for the lifetime of this component because it's possible
  // that the user might have different windows open (such as one with a list of products and the other with the product edit window)
  // We want to ensure that the changes are refleting in realtime in both the windows
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
