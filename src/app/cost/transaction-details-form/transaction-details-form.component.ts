import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup , Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {TransactionDetails } from '../transaction-details/transaction-details';
import {TransactionDetailsService} from '../transaction-details/transaction-details.service'

import {Person } from '../person/person';
import {PersonService} from '../person/person.service'

import {UserService} from '../../core/user/user.service'
import {User} from '../../core/user/user'

import {Caccount } from '../account/caccount';
import {AccountService} from '../account/account.service'



@Component({
  selector: 'transaction-details-form',
  templateUrl: './transaction-details-form.component.html',
  styleUrls: ['./transaction-details-form.component.css'],
  providers:[TransactionDetailsService,
             AccountService,
             PersonService,
             UserService]
})
export class TransactionDetailsFormComponent implements OnInit {

  rForm : FormGroup;
  transactionDetails : TransactionDetails;
  users : User[];
  accounts : Caccount[];
  currentUser : User;
  
  submitted = false;
  onSubmit() { this.submitted = true; }

  constructor(private fb : FormBuilder , 
              private transactionDetailsService:TransactionDetailsService, 
              private accountService:AccountService,               
              private personService:PersonService, 
              private userService:UserService, 
              private route: ActivatedRoute,
              private router: Router) {
    this.rForm = fb.group({
      'cancellation_reason': [null ,Validators.compose( [ Validators.maxLength(100)] )],
      'creation_date': '',
      'transaction_id': '' ,
      'amount': '',
      'received_date': '',
      'schedule_date': '',
      'account_id_from': '',
      'account_id_to': '',
      'cancellation_date': '',
      'cancelled_by': ''

    })

   }

 ngOnInit() {

  
   if (this.route.params['value'].id)
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.transactionDetailsService.getTransactionDetail(this.route.params['value'].id))
      .subscribe((transactionDetails: TransactionDetails) => this.transactionDetails = transactionDetails);

     

     if (this.transactionDetails == null){
        this.transactionDetails = new TransactionDetails();        

        if (this.route.params['value'].transaction_id){
            this.transactionDetails.transaction_id= this.route.params['value'].transaction_id;
        }

      }

      this.getData();
}


  getData() {
    this.accountService.getCaccounts()
                     .then(
                       accounts =>  this.accounts = accounts,
                       error =>  console.log (error) );

    this.userService.getUsers()
                     .then(
                       users =>  this.users = users,
                       error =>  console.log (error) );

/*
this.userService.getCurrentUser()
                     .then(
                       user =>  {this.currentUser = user; this.transactionDetails.user_id = this.currentUser.id} , 
                       error =>  console.log (error) );
*/
  }
  
  addPost(transactionDetails){
    console.log(transactionDetails);
  }


  saveTransactionDetails(transactionDetails){

    
    if (this.transactionDetails.id){
     this.transactionDetailsService.update(this.transactionDetails);
    } else {
      this.transactionDetailsService.create(this.transactionDetails);
    }
    
    this.router.navigate(['/transaction',this.transactionDetails.transaction_id]);
  }  
  
  

  update(transactionDetails){
    this.transactionDetailsService.update(this.transactionDetails);
    console.log(this.transactionDetails);
    this.router.navigate(['/transaction',this.transactionDetails.transaction_id]);
    
  }

  deleteTransactionDetails(id){

    
    this.transactionDetailsService.delete(this.transactionDetails.id);
    this.transactionDetailsService.getTransactionDetails();
    this.router.navigate(['/transaction',this.transactionDetails.transaction_id]);
  }

}
