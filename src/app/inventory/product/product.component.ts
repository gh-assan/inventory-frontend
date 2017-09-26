import { Component, OnInit } from '@angular/core';
import {ProductService} from './product.service'
import {Product} from './product'
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlertService } from '../../core/alert/alert.service';


@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[ProductService]
})
export class ProductComponent implements OnInit {

  products :Product[] ;
  errorMessage: string;
  //mode = 'Observable';

  constructor(private productService:ProductService,
              private alertService:AlertService,
              private route: ActivatedRoute,
              private router: Router) { }

  
  getProducts() {
    this.productService.getProducts()
                     .then(
                       products =>  this.products = products,
                       error =>  {
                                    this.errorMessage = <any>error ; 
                                    console.error(this.errorMessage);                                   
                                    this.alertService.error(this.errorMessage);
                                 });
  }

  ngOnInit() {
    this.getProducts();
  }


  onSelect(product: Product) {
    this.router.navigate(['/product', product.id]);
  }

addNewProduct() {
    this.router.navigate(['/new-product']);
  }

}
