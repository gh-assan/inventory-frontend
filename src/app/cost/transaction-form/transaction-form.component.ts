import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup , Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {Transaction } from '../transaction/transaction';
import {TransactionService} from '../transaction/transaction.service'

import {Person } from '../person/person';
import {PersonService} from '../person/person.service'

import {UserService} from '../../core/user/user.service'
import {User} from '../../core/user/user'

import {Caccount } from '../account/caccount';
import {AccountService} from '../account/account.service'


import {TransactionType } from '../transaction-type/transaction-type';
import {TransactionTypeService} from '../transaction-type/transaction-type.service'


@Component({
  selector: 'transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
  providers:[TransactionService,
             TransactionTypeService,
             AccountService ,
             PersonService,
             UserService]
})
export class TransactionFormComponent implements OnInit {

  rForm : FormGroup;
  transaction : Transaction;
  types : TransactionType[];
  persons : Person[];
  currentUser : User;

  accounts : Caccount[];

  
  submitted = false;
  onSubmit() { this.submitted = true; }

  constructor(private fb : FormBuilder , 
              private transactionService:TransactionService, 
              private transactionTypeService:TransactionTypeService, 
              private accountService:AccountService, 
              private personService:PersonService, 
              private userService:UserService, 
              private route: ActivatedRoute,
              private router: Router) {
    this.rForm = fb.group({
      'description': [null ,Validators.compose( [ Validators.maxLength(100)] )],
      'ledger_id': '',
      'person_id': '' ,
      'creation_date': '',
      'update_date': '',
      'validation_date': '',
      'total_amount': '',
      'notes': '',
      'transaction_type_id': '',
      'num_of_payments': '',
      'account_id_from': '',
      'account_id_to': '',
      
    })

   }

 ngOnInit() {

   if (this.route.params['value'].id)
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.transactionService.getTransaction(this.route.params['value'].id))
      .subscribe((transaction: Transaction) => this.transaction = transaction);

     

     if (this.transaction == null){
        this.transaction = new Transaction();        
      }

      this.getData();
}


  getData() {
    this.transactionTypeService.getTransactionTypes()
                     .then(
                       types =>  this.types = types,
                       error =>  console.log (error) );

    this.personService.getPersons()
                     .then(
                       persons =>  this.persons = persons,
                       error =>  console.log (error) );

    this.userService.getCurrentUser()
                     .then(
                       user =>  {this.currentUser = user; this.transaction.user_id = this.currentUser.id} , 
                       error =>  console.log (error) );

    this.accountService.getCaccounts()
                     .then(
                       accounts =>  this.accounts = accounts,
                       error =>  console.log (error) );                   

  }
  
  addPost(transaction){
    console.log(transaction);
  }


  saveTransaction(transaction){

    console.log(transaction);

    if (this.transaction.id){
     this.transactionService.update(this.transaction);
    } else {
      this.transactionService.create(this.transaction);
    }
    
    this.router.navigate(['/transactions']);
  }  
  
  

  update(transaction){
    this.transactionService.update(this.transaction);
    this.router.navigate(['/transactions']);
    
  }

  deleteTransaction(id){

    
    this.transactionService.delete(this.transaction.id);
    this.transactionService.getTransactions();
    this.router.navigate(['/transactions']);
  }

}
