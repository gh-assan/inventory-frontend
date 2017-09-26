import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup , Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {Caccount } from '../account/caccount';
import {AccountService} from '../account/account.service'

import {Ledger } from '../ledger/ledger';
import {LedgerService} from '../ledger/ledger.service'

import {Person } from '../person/person';
import {PersonService} from '../person/person.service'

import {UserService} from '../../core/user/user.service'
import {User} from '../../core/user/user'



@Component({
  selector: 'account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css'],
  providers:[AccountService,
             LedgerService,
             PersonService,
             UserService]
})
export class AccountFormComponent implements OnInit {

  rForm : FormGroup;
  account : Caccount;
  ledgers : Ledger[];
  persons : Person[];
  currentUser : User;
  
  submitted = false;
  onSubmit() { this.submitted = true; }

  constructor(private fb : FormBuilder , 
              private accountService:AccountService, 
              private ledgerService:LedgerService, 
              private personService:PersonService, 
              private userService:UserService, 
              private route: ActivatedRoute,
              private router: Router) {
    this.rForm = fb.group({
      'name': [null , Validators.required],
      'description': [null ,Validators.compose( [ Validators.maxLength(100)] )],
      'ledger_id': '',
      'person_id': ''
    })

   }

 ngOnInit() {

   if (this.route.params['value'].id)
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.accountService.getCaccount(this.route.params['value'].id))
      .subscribe((account: Caccount) => this.account = account);

     

     if (this.account == null){
        this.account = new Caccount();        
      }

      this.getData();
}


  getData() {
    this.ledgerService.getLedgers()
                     .then(
                       ledgers =>  this.ledgers = ledgers,
                       error =>  console.log (error) );

    this.personService.getPersons()
                     .then(
                       persons =>  this.persons = persons,
                       error =>  console.log (error) );

this.userService.getCurrentUser()
                     .then(
                       user =>  {this.currentUser = user; this.account.user_id = this.currentUser.id} , 
                       error =>  console.log (error) );

  }
  
  addPost(account){
    console.log(account);
  }


  saveAccount(account){

    
    if (this.account.id){
     this.accountService.update(this.account);
    } else {
      this.accountService.create(this.account);
    }
    
    this.router.navigate(['/accounts']);
  }  
  
  

  update(account){
    this.accountService.update(this.account);
    this.router.navigate(['/accounts']);
    
  }

  deleteAccount(id){

    
    this.accountService.delete(this.account.id);
    this.accountService.getCaccounts();
    this.router.navigate(['/accounts']);
  }

}
