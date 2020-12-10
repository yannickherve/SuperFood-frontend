import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Cart, CartServerResponse} from '../models/cart.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {CartService} from './cart.service';
import {catchError, finalize} from 'rxjs/operators';


export class CartDatasource implements DataSource<Cart>{
  private cartSubject = new BehaviorSubject<Cart[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private cartService: CartService) {
  }

  loadCartData(sortBy: string, page: number, limit: number): void {
    this.loadingSubject.next(true);
    this.cartService.getCart(sortBy, page, limit).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(carts => {
      // this.cartSubject.next(carts);
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<Cart[] | ReadonlyArray<Cart>> {
    console.log('Connecting data source');
    return this.cartSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.log('lesson datasoucre disconnect');
    this.cartSubject.complete();
    this.loadingSubject.complete();
  }
}
