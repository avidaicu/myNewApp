import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map, take } from 'rxjs/operators';

import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products/';

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }

  getProducts(): Observable<Product[]> {
    // return this.http.get<Product[]>(this.productsUrl)
    //   .pipe(
    //     // tap(data => console.log(JSON.stringify(data))),
    //     tap(function(data) {
    //       // console.log(JSON.stringify(data))
    //     }),
    //     catchError(this.handleError)
    //   );
    return this.db.list<Product>(this.productsUrl)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({ key: a.payload.key, ...a.payload.val() }))
        )
      );
  }

  getProduct(productId): Observable<Product> {

    console.log('productId', productId);

    if (productId === 0) {
      return of(this.initializeProduct());
    }
    const url = `${this.productsUrl}/${productId}`;

    // console.log('url', url);

    // return this.http.get<Product>(url)
    //   .pipe(
    //     tap(data => console.log('getProduct: ' + JSON.stringify(data))),
    //     catchError(this.handleError)
    //   );

    return this.db.object<any>(this.productsUrl + productId)
    .valueChanges()
    .pipe(tap(data => console.log('getProduct: ' + JSON.stringify(data))));
  }

  // createProduct(product: Product): Observable<Product> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   product.id = null;
  //   return this.http.post<Product>(this.productsUrl, product, { headers })
  //     .pipe(
  //       tap(data => console.log('createProduct: ' + JSON.stringify(data))),
  //       catchError(this.handleError)
  //     );
  // }

  createProduct(product: Product) {
    return this.db.list<Product>(this.productsUrl).push(product);
  }

  deleteProduct(productId: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${productId}`;
    return this.http.delete<Product>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + productId)),
        catchError(this.handleError)
      );
  }

  updateProduct(productId: number, product: Product) {
    console.log('product', product);
    console.log('productId', productId);
    return this.db.object<any>(this.productsUrl + productId).update(product);
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const url = `${this.productsUrl}/${productId}`;
    // return this.http.put<Product>(url, product, { headers })
    //   .pipe(
    //     tap(() => console.log('updateProduct: ' + productId)),
    //     // Return the product on an update
    //     map(() => product),
    //     catchError(this.handleError)
    //   );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeProduct(): Product {
    // Return an initialized object
    return {
      // id: 0,
      productName: null,
      productCode: null,
      tags: [''],
      releaseDate: null,
      price: null,
      description: null,
      starRating: null,
      imageUrl: null
    };
  }
}
