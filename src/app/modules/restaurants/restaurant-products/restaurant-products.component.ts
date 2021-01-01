import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestaurantService} from '../services/restaurant.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '@full-fledged/alerts';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {ProductServerResponse} from '../../products/models/product.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-restaurant-products',
  templateUrl: './restaurant-products.component.html',
  styleUrls: ['./restaurant-products.component.scss']
})
export class RestaurantProductsComponent implements OnInit, OnDestroy {
  products: ProductServerResponse;
  loadRestaurantProductsSubs: Subscription;
  productsObserver = {
    next: (data) => {
      console.log(data);
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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadRestaurantProducts();
  }

  loadRestaurantProducts(): void {
    this.loadRestaurantProductsSubs = this.restaurantService.getProductsByRestaurant(this.route.snapshot.paramMap.get('id')).pipe(
      map(productsData => this.products = productsData)
    ).subscribe(this.productsObserver);
  }

  ngOnDestroy(): void {
    if (this.loadRestaurantProductsSubs) {
      this.loadRestaurantProductsSubs.unsubscribe();
    }
  }

}
