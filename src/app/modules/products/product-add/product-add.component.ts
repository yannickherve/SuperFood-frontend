import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertService} from '@full-fledged/alerts';
import {NgxSpinnerService} from 'ngx-spinner';
import {RestaurantService} from '../../restaurants/services/restaurant.service';
import {map} from 'rxjs/operators';
import {RestaurantServerResponse} from '../../restaurants/models/restaurant';
import {CategoryService} from '../../category/services/category.service';
import {Category} from '../../category/models/category.model';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit, OnDestroy {
  productForm = this.fb.group({
    name: [null, Validators.compose([
      Validators.minLength(3)])
    ],
    description: [null, Validators.required],
    price: [null, Validators.required],
    category: [null, Validators.required],
    image: [null, Validators.required],
    restaurant: [null, Validators.required],
  });

  imagePreview: string;
  createProductSubs: Subscription;
  getRestaurantsSubs: Subscription;
  getCategoriesSubs: Subscription;
  restaurants: RestaurantServerResponse;
  categories: Category[];

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private restaurantService: RestaurantService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.alertService.info('Veillez à créer un restaurant avant d\'enregistrer un produit');
    this.getCategoriesList();
    this.getRestaurantsList();
  }

  // create a product
  createAProduct(): void {
    this.showSpinner();
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price);
    formData.append('category', this.productForm.value.category);
    formData.append('restaurant', this.productForm.value.restaurant);
    formData.append('image', this.productForm.value.image);

    const observer = {
      next: data => {
        this.spinner.hide();
        this.alertService.success('Produit crée avec succès');
        this.route.navigate(['/moderator/restaurants']).then(() => {});
      },
      error: error => {
        this.spinner.hide();
        this.alertService.danger(error);
      }
    };
    this.createProductSubs = this.productService.createProduct(formData).subscribe(observer);
  }

  onSelect(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.productForm.patchValue({image: file});
    this.productForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }

  getRestaurantsList(): void {
    const restaurantsObserver = {
      next: restaurants => {
        this.alertService.info('Liste des restaurants OK!');
      },
      error: error => {
        this.alertService.danger('Erreur lors de la réccupération des restaurants \n impossible de continuer');
      }
    };
    this.getRestaurantsSubs = this.restaurantService.getRestaurants().pipe(
      map(restaurantsData => this.restaurants = restaurantsData)
    ).subscribe(restaurantsObserver);
  }

  getCategoriesList(): void {
    const categoriesObserver = {
      next: categories => {
        this.alertService.info('Liste des catégories OK!');
      },
      error: error => {
        this.alertService.danger('Erreur lors de la réccupération des catégories \n impossible de continuer');
      }
    };
    this.getCategoriesSubs = this.categoryService.getCategories().pipe(
      map(categoriesData => this.categories = categoriesData)
    ).subscribe(categoriesObserver);
  }

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

  ngOnDestroy(): void {
    if (this.getRestaurantsSubs) {
      this.getRestaurantsSubs.unsubscribe();
    }
    if (this.createProductSubs) {
      this.createProductSubs.unsubscribe();
    }
    if (this.getCategoriesSubs) {
      this.getCategoriesSubs.unsubscribe();
    }
  }

}
