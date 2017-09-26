import { Component, OnInit } from '@angular/core';
import {TransactionTypeService} from './transaction-type.service'
import {TransactionType} from './transaction-type'
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-transaction-type',
  templateUrl: './transaction-type.component.html',
  styleUrls: ['./transaction-type.component.css'],
  providers:[TransactionTypeService]
})
export class TransactionTypeComponent implements OnInit {

  transactionTypes :TransactionType[] ;
  errorMessage: string;
  
  constructor(private transactionTypeService:TransactionTypeService ,
              private route: ActivatedRoute,
              private router: Router) 
  { }

  
  getTransactionTypes() {
    this.transactionTypeService.getTransactionTypes()
                     .then(
                       transactionTypes =>  this.transactionTypes = transactionTypes,
                       error =>  this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.getTransactionTypes();
  }

   onSelect(transactionType: TransactionType) {
    this.router.navigate(['/transaction-type', transactionType.id]);
  }

addNewTransactionType() {
    this.router.navigate(['/new-transaction-type']);
  }


}
