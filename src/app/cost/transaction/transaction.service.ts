import { Injectable } from '@angular/core';

import {Transaction} from './transaction'
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';
import { HttpQueryItem } from '../../core/core-services/http-query-item';



@Injectable()
export class TransactionService {

  private transactionsUrl = 'http://localhost:1111/transaction';  // URL to web API

  constructor(private http: Http) { }
  
  getTransactions (): Promise<Transaction[]> {
    return this.http.get(this.transactionsUrl)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }

  getTransaction (id : number): Promise<Transaction> {
    return this.http.get(this.transactionsUrl+"/"+id)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }


  create (transaction:Transaction): Promise<Transaction> {
    return this.http.post(this.transactionsUrl , transaction)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }


  update (transaction: Transaction): Promise<Transaction> {
    return this.http.put(this.transactionsUrl+"/"+transaction.id ,transaction )                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }


  delete (id: Number): Promise<Transaction> {
    return this.http.delete(this.transactionsUrl+"/"+id )                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }



  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return //Observable.throw(errMsg);
  }


  search(terms: Observable<any>) {
    return terms
      //.debounceTime(400)
      //.distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
    let options = term;
    /*
    let options = {
    "query" : term
    };
    
    console.log(options);
    */

    return this.http.post(this.transactionsUrl + "/filter" , options)                             
                  //  .toPromise()
                  //.then(this.extractData)
                  //.catch(this.handleError);
                  .map(res => this.extractData(res))
                  ;

    //console.log(data);
    //return data;
  }

}
