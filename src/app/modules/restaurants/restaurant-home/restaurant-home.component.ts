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
  pageSizeOptions: number[] = [2, 5, 10, 25, 100];
  pageEvent: PageEvent;
  filterValue: string;
  restaurantsObserver = {
    next: () => {
      setTimeout(() => {
        this.spinner.hide();
      }, 600);
    },
    error: (error) => {
      this.alertService.danger(error);
      this.spinner.hide();
    }
  };

  constructor(
    private restaurantService: RestaurantService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadRestaurants();
  }

  // Load restaurants
  loadRestaurants(): void {
    this.showSpinner();
    this.restaurantService.getRestaurants('createdAt:desc', 1, 10).pipe(
      map((restaurantsData => this.dataSource = restaurantsData))
    ).subscribe(this.restaurantsObserver);

    if (this.dataSource === undefined) {
      setTimeout(() => {
        this.spinner.hide();
      }, 600);
    }
  }

  // Listen paginate change
  onPaginateChange(event: PageEvent): void {
    this.showSpinner();
    const defaultSort = 'createdAt:desc';
    let page = event.pageIndex;
    const limit = event.pageSize;
    page = page + 1;

    if (this.filterValue === undefined) {
      this.restaurantService.getRestaurants(defaultSort, page, limit).pipe(
        map(restaurantsData => this.dataSource = restaurantsData)
      ).subscribe(this.restaurantsObserver);
    } else {
      this.restaurantService.paginateByName(defaultSort, page, limit, this.filterValue).pipe(
        map(restaurantsData => this.dataSource = restaurantsData)
      ).subscribe(this.restaurantsObserver);
    }

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

  applyFilterByName(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.restaurantService.paginateByName('createdAt:desc', 1, 10, this.filterValue).pipe(
      map(restaurantsData => this.dataSource = restaurantsData)
    ).subscribe();
  }
}
