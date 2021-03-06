import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestaurantService} from '../services/restaurant.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '@full-fledged/alerts';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {ProductServerResponse} from '../../products/models/product.model';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {Location} from '@angular/common';
import {Restaurant, RestaurantServerResponse} from '../models/restaurant';

@Component({
  selector: 'app-restaurant-products',
  templateUrl: './restaurant-products.component.html',
  styleUrls: ['./restaurant-products.component.scss']
})
export class RestaurantProductsComponent implements OnInit, OnDestroy {
  products: ProductServerResponse;
  restaurant: Restaurant;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  loadRestaurantProductsSubs: Subscription;
  productsObserver = {
    next: (data) => {
      setTimeout(() => {
        this.spinner.hide();
      }, 600);
    },
    error: (error) => {
      this.alertService.danger(error.error.message);
      this.spinner.hide();
    }
  };

  constructor(
    private restaurantService: RestaurantService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadRestaurant();
    this.loadRestaurantProducts();
  }

  loadRestaurantProducts(): void {
    const restaurantId = this.route.snapshot.paramMap.get('id');
    this.loadRestaurantProductsSubs = this.restaurantService.getProductsByRestaurant(restaurantId, 'createdAt:desc', 1, 10).pipe(
      map(productsData => this.products = productsData)
    ).subscribe(this.productsObserver);
  }

  onPaginateChange(event: PageEvent): void {
    // this.showSpinner();
    const defaultSort = 'createdAt:desc';
    let page = event.pageIndex;
    const limit = event.pageSize;
    page = page + 1;

    const restaurantId = this.route.snapshot.paramMap.get('id');

    this.loadRestaurantProductsSubs = this.restaurantService.getProductsByRestaurant(restaurantId, defaultSort, page, limit).pipe(
      map(productsData => this.products = productsData)
    ).subscribe(this.productsObserver);
  }

  back(): void {
    this.location.back();
  }

  loadRestaurant(): void {
    const restaurantId = this.route.snapshot.paramMap.get('id');
    this.restaurantService.getRestaurant(restaurantId).pipe(
      map((restaurantsData => this.restaurant = restaurantsData))
    ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.loadRestaurantProductsSubs) {
      this.loadRestaurantProductsSubs.unsubscribe();
    }
  }

}
