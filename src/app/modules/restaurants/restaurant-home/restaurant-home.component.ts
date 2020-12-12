import { Component, OnInit } from '@angular/core';
import {RestaurantServerResponse} from '../models/restaurant';
import {PageEvent} from '@angular/material/paginator';
import {RestaurantService} from '../services/restaurant.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '@full-fledged/alerts';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.scss']
})
export class RestaurantHomeComponent implements OnInit {
  dataSource: RestaurantServerResponse;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  restaurantsObserver = {
    next: () => {
      setTimeout(() => {
        console.log(this.dataSource);
        this.spinner.hide();
      }, 700);
    },
    error: (error) => {
      this.alertService.danger(error.error.message);
      this.spinner.hide();
    }
  };

  constructor(
    private restaurantService: RestaurantService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.lodRestaurants();
    console.log(this.dataSource);
  }

  lodRestaurants(): void {
    this.restaurantService.getRestaurants('createdAt:desc', 1, 10).pipe(
      map((restaurantsData => this.dataSource = restaurantsData))
    ).subscribe(this.restaurantsObserver);
  }

  // Paginate change
  onPaginateChange(event: PageEvent): void {
    this.showSpinner();
    const defaultSort = 'createdAt:desc';
    let page = event.pageIndex;
    const limit = event.pageSize;
    page = page + 1;
    this.restaurantService.getRestaurants(defaultSort, page, limit).pipe(
      map(productsData => this.dataSource = productsData)
    ).subscribe(this.restaurantsObserver);
  }

  // Spinner method
  showSpinner(): void {
    this.spinner.show(undefined,
      {
        type: 'line-scale-party',
        size: 'medium',
        color: 'white',
        fullScreen: true
      }
    );
  }

}
