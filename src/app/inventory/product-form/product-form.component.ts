import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup , Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {Product} from '../product/product'
import {ProductService} from '../product/product.service'

import {UserService} from '../../core/user/user.service'
import {User} from '../../core/user/user'



@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  providers:[ProductService,
             UserService]
})
export class ProductFormComponent implements OnInit {

  rForm : FormGroup;
  product : Product;
  currentUser : User;
  
  submitted = false;
  onSubmit() { this.submitted = true; }

  constructor(private fb : FormBuilder , 
              private productService:ProductService, 
              private userService:UserService, 
              private route: ActivatedRoute,
              private router: Router) {
    this.rForm = fb.group({
      'name': '',
      'description': '',
      'creation_date': '',
      'update_date':'',
      'price':''
    })

   }

 ngOnInit() {

   if (this.route.params['value'].id)
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.productService.getProduct(this.route.params['value'].id))
      .subscribe((product: Product) => this.product = product);

      if (this.product == null)
        this.product = new Product();

      this.getData();  
  }


  getData() {
  
this.userService.getCurrentUser()
                     .then(
                       user =>  {this.currentUser = user; this.product.user_id = this.currentUser.id} , 
                       error =>  console.log (error) );

  }
  

  addPost(product){
    console.log(product);
  }


  saveProduct(product){

    
    if (this.product.id){
     this.productService.update(this.product);
    } else {
      this.productService.create(this.product);
    }
    
    this.router.navigate(['/products']);
  }  
  
  

  update(product){
    this.productService.update(this.product);
    this.router.navigate(['/products']);
    
  }

  deleteProduct(id){

    
    this.productService.delete(this.product.id);
    this.productService.getProducts();
    this.router.navigate(['/products']);
  }

}
