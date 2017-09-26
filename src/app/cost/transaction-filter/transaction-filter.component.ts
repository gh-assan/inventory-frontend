import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/combineLatest';
import {Observable} from 'rxjs/Rx';

import { HttpQueryItem } from '../../core/core-services/http-query-item';
import {AppHttpOptionsService} from '../../core/core-services/app-http-options.service';

import {TransactionService} from '../transaction/transaction.service'
import {Transaction} from '../transaction/transaction'




@Component({
  selector: 'app-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.css'],
  providers:[TransactionService]
})
export class TransactionFilterComponent implements OnInit {

  searchTerm$ = new Subject<string>();

  description$ = new Subject<HttpQueryItem>();
  userName$ = new Subject<HttpQueryItem>();
  personName$ = new Subject<HttpQueryItem>();


  limit$ = new Subject<string>();
  offset$ = new Subject<string>();
  order$ = new Subject<string>();


  limit  = '10';
  offset = '0';
  


  transactions :Transaction[] ;

  
  ngOnInit() {
  }

  newQueryItem(column:string , value:string , operator:string = '=') :HttpQueryItem{
    return new HttpQueryItem(column , value , operator);
  }

  constructor(private transactionService:TransactionService , 
              private appHttpOptionsService:AppHttpOptionsService) { 

/*
    // Combine latest of source1 and source2 whenever either gives a value
var source = Observable.combineLatest(
    this.description$,
    this.personName$,
    this.userName$
  ).distinctUntilChanged((x:Array<HttpQueryItem> , y : Array<HttpQueryItem> ) => 
  {
    if (x.length !== y.length) return false;
    let result = x.filter( (key,value) => ! key.equla(y[value]) )
    return result.length == 0;
  } );
*/
  /*
var subscription = source.subscribe(
  function (x) {
    console.log('Next: %s', JSON.stringify(x));
  },
  function (err) {
    console.log('Error: %s', err);
  },
  function () {
    console.log('Completed');
  });
*/
/*
  this.transactionService
       .search(source)
       .subscribe(
         results => {
            this.transactions = results.results;
            console.log(results.results);
        }
      );

  */
  
var source = Observable.combineLatest(
    this.description$,
    this.personName$,
    this.userName$
  ).distinctUntilChanged((x:Array<HttpQueryItem> , y : Array<HttpQueryItem> ) => 
  {
    if (x.length !== y.length) return false;
    let result = x.filter( (key,value) => ! key.equla(y[value]) )
    return result.length == 0;
  } ).combineLatest(
    this.limit$,
    this.offset$,
    this.order$
  ).map(
    x => this.appHttpOptionsService.getFilterBody(x[0],x[1],x[2],x[3])
  )
  ;


  this.transactionService
       .search(source)
       .subscribe(
         results => {
            console.log(results);
            this.transactions = results;
            
        }
      );

  
  var subscription = source.subscribe(
  function (x) {
    console.log('Next: %s', JSON.stringify(x));
  },
  function (err) {
    console.log('Error: %s', err);
  },
  function () {
    console.log('Completed');
  });


  this.limit$.next(this.limit.toString());
  this.offset$.next(this.offset.toString());
  this.order$.next('1');

  this.offset$.subscribe(offset => this.offset = ((parseInt(offset)+1) *  parseInt(this.limit)).toString())  ;
}
  
  

}
