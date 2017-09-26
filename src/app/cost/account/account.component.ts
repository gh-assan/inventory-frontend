import { Component, OnInit } from '@angular/core';
import {AccountService} from './account.service'
import {Caccount} from './caccount'
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers:[AccountService]
})
export class AccountComponent implements OnInit {

  accounts :Caccount[] ;
  errorMessage: string;
  
  constructor(private accountService:AccountService ,
              private route: ActivatedRoute,
              private router: Router) 
  { }

  

  getAccounts() {
    this.accountService.getCaccounts()
                     .then(
                       accounts =>  this.accounts = accounts,
                       error =>  this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.getAccounts();
  }

   onSelect(account: Caccount) {
    this.router.navigate(['/account', account.id]);
  }

addNewAccount() {
    this.router.navigate(['/new-account']);
  }


}
