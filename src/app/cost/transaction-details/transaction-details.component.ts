import { Component, OnInit } from '@angular/core';
import {TransactionDetailsService} from './transaction-details.service'
import {TransactionDetails} from './transaction-details'
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css'],
  providers:[TransactionDetailsService]
})
export class TransactionDetailsComponent implements OnInit {

  transactionDetails :TransactionDetails[] ;
  errorMessage: string;
  
  constructor(private transactionDetailsService:TransactionDetailsService ,
              private route: ActivatedRoute,
              private router: Router) 
  { }

  

  getTransactionDetails() {
    this.transactionDetailsService.getTransactionDetails()
                     .then(
                       transactionDetails =>  this.transactionDetails = transactionDetails,
                       error =>  this.errorMessage = <any>error);
  }

  ngOnInit() {

     if (this.route.params['value'].id)
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.transactionDetailsService.getDetailsByTransaction(this.route.params['value'].id))
      .subscribe((transactionDetails: TransactionDetails[]) => this.transactionDetails = transactionDetails);

    /*
    else 
      this.getTransactionDetails();
    */  
  }

   onSelect(transactionDetails: TransactionDetails) {
    this.router.navigate(['/transaction-details', transactionDetails.id]);
  }

addNewTransactionDetails() {
    this.router.navigate(['/new-transaction-details',this.route.params['value'].id]);
  }


}
