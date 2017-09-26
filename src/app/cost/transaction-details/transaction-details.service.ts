import { Injectable } from '@angular/core';

import {TransactionDetails} from './transaction-details'
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';



@Injectable()
export class TransactionDetailsService {

  private transactionDetailsUrl = 'http://localhost:1111/transaction-detail';  // URL to web API

  constructor(private http: Http) { }
  
  getTransactionDetails (): Promise<TransactionDetails[]> {
    return this.http.get(this.transactionDetailsUrl)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }

  getTransactionDetail (id : number): Promise<TransactionDetails> {
    return this.http.get(this.transactionDetailsUrl+"/"+id)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }

  getDetailsByTransaction (transaction_id : number): Promise<TransactionDetails[]> {
    return this.http.get(this.transactionDetailsUrl+"/transaction/"+transaction_id)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }

  create (transactionDetails:TransactionDetails): Promise<TransactionDetails> {
    return this.http.post(this.transactionDetailsUrl , transactionDetails)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }


  update (transactionDetails: TransactionDetails): Promise<TransactionDetails> {
    return this.http.put(this.transactionDetailsUrl+"/"+transactionDetails.id ,transactionDetails )                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }


  delete (id: Number): Promise<TransactionDetails> {
    return this.http.delete(this.transactionDetailsUrl+"/"+id )                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }



  private extractData(res: Response) {
    let body = res.json();
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


}
