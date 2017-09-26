import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup , Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {PurchaseItem} from './purchase-item'
import {PurchaseData} from './purchase-data'
import {PurchaseService} from './purchase.service'

import {UserService} from '../../core/user/user.service'
import {User} from '../../core/user/user'


import {Product} from '../product/product'
import {ProductService} from '../product/product.service'


@Component({
  selector: 'purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
  providers:[PurchaseService,UserService,ProductService]
})
export class PurchaseComponent implements OnInit {

  rForm : FormGroup;
  pForm : FormGroup;
  purchaseItems : PurchaseItem[];
  purchaseItem : PurchaseItem;
  purchaseData : PurchaseData;
  currentUser : User;
  
  products : Product[];

  submitted = false;
  onSubmit() { this.submitted = true; }

  constructor(private fb : FormBuilder , 
              private purchaseService:PurchaseService, 
              private userService:UserService, 
              private productService:ProductService, 
              private route: ActivatedRoute,
              private router: Router) {
    this.rForm = fb.group({
      'product_id': '',
      'amount':'',
      'price':''
    })
    
    this.pForm = fb.group({
      'description':''
    })

   }

 ngOnInit() {

   if (this.route.params['value'].id)
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.purchaseService.getPurchase(this.route.params['value'].id))
      .subscribe((purchase:PurchaseData) => { 
          this.purchaseData =  purchase;
          //this.purchaseItem =  this.purchaseData.details;
          console.log(purchase.details);
      
      });
      
      this.purchaseItem = new PurchaseItem();

      this.getData();  
  }


  getData() {
  
this.userService.getCurrentUser()
                     .then(
                       user =>  {this.currentUser = user; /*this.product.user_id = this.currentUser.id*/} , 
                       error =>  console.log (error) );



this.productService.getProducts()
                     .then(
                       products =>  {this.products = products; } , 
                       error =>  console.log (error) );
                       
  }
  
  simpleClone(obj: any) {
    return Object.assign({}, obj);
  }

  addItem(purchaseItem:PurchaseItem){

    let purchaseItemNew:PurchaseItem = this.simpleClone (purchaseItem);
    purchaseItemNew.product_name = this.getProductName(purchaseItem.product_id);

    this.purchaseData.details.push(purchaseItemNew);
    this.purchaseItem = new PurchaseItem();
  }

  removeItem(purchaseItems:PurchaseItem){
    this.purchaseData.details = this.purchaseData.details.filter(obj => obj !== purchaseItems);

  }


  onSelect(purchaseItem:PurchaseItem) {
    //this.removeItem(purchaseItem);
    this.purchaseItem = purchaseItem;

  }


  addPost(product){
    console.log(product);
  }

  create(){
    console.log('create');
    this.purchaseData.user_id = this.currentUser.id;
    this.purchaseService.create(this.purchaseData)
                      .then( p => console.log(p))
                      .catch(e => console.log(e));
    console.log('after create');
  }

  getProductName(product_id){
    let product:Product = this.products.find(product => product.id == product_id);
    if (product) return product.name ;
  }


  /*
  saveProduct(product){

    
    if (this.product.id){
     this.purchaseService.update(this.product);
    } else {
      this.purchaseService.create(this.product);
    }
    
    this.router.navigate(['/products']);
  }  
  */
  
}
