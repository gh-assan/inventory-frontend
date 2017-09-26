import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup , Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {TransactionType } from '../transaction-type/transaction-type';
import {TransactionTypeService} from '../transaction-type/transaction-type.service'

@Component({
  selector: 'transaction-type-form',
  templateUrl: './transaction-type-form.component.html',
  styleUrls: ['./transaction-type-form.component.css'],
  providers:[TransactionTypeService]
})
export class TransactionTypeFormComponent implements OnInit {

  rForm : FormGroup;
  transactionType : TransactionType;
  
  submitted = false;
  onSubmit() { this.submitted = true; }

  constructor(private fb : FormBuilder , 
              private transactionTypeService:TransactionTypeService, 
              private route: ActivatedRoute,
              private router: Router) {
    this.rForm = fb.group({
      'name': [null , Validators.required],
      'description': [null ,Validators.compose( [ Validators.maxLength(100)] )],
      'due_date': ''
    })

   }

 ngOnInit() {

   if (this.route.params['value'].id)
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.transactionTypeService.getTransactionType(this.route.params['value'].id))
      .subscribe((transactionType: TransactionType) => {this.transactionType = transactionType ; console.log(transactionType)});

      if (this.transactionType == null)
        this.transactionType = new TransactionType();
  }

  addPost(transactionType){
    console.log(transactionType);
  }


  saveTransactionType(transactionType){

    console.log(transactionType);
    if (this.transactionType.id){
     this.transactionTypeService.update(this.transactionType);
    } else {
      this.transactionTypeService.create(this.transactionType);
    }
    
    this.router.navigate(['/transaction-types']);
  }  
  
  

  update(transactionType){
    this.transactionTypeService.update(this.transactionType);
    this.router.navigate(['/transaction-types']);
    
  }

  deleteTransactionType(id){

    
    this.transactionTypeService.delete(this.transactionType.id);
    this.transactionTypeService.getTransactionTypes();
    this.router.navigate(['/transaction-types']);
  }

}
