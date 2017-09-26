import { Component, OnInit } from '@angular/core';
import {TransactionService} from './transaction.service'
import {Transaction} from './transaction'
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers:[TransactionService]
})
export class TransactionComponent implements OnInit {

  transactions :Transaction[] ;
  errorMessage: string;
  
  constructor(private transactionService:TransactionService ,
              private route: ActivatedRoute,
              private router: Router) 
  { }

  

  getTransactions() {
    this.transactionService.getTransactions()
                     .then(
                       transactions =>  this.transactions = transactions,
                       error =>  this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.getTransactions();
  }

   onSelect(transaction: Transaction) {
    this.router.navigate(['/transaction', transaction.id]);
  }

addNewTransaction() {
    this.router.navigate(['/new-transaction']);
  }


}
