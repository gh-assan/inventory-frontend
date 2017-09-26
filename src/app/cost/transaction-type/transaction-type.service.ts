import { Injectable } from '@angular/core';

import {TransactionType} from './transaction-type'
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';



@Injectable()
export class TransactionTypeService {

  private transactionTypesUrl = 'http://localhost:1111/transaction-type';  // URL to web API

  constructor(private http: Http) { }
  
  getTransactionTypes (): Promise<TransactionType[]> {
    return this.http.get(this.transactionTypesUrl)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }

  getTransactionType (id : number): Promise<TransactionType> {
    return this.http.get(this.transactionTypesUrl+"/"+id)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }


  create (transactionType:TransactionType): Promise<TransactionType> {
    return this.http.post(this.transactionTypesUrl , transactionType)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }


  update (transactionType: TransactionType): Promise<TransactionType> {
    return this.http.put(this.transactionTypesUrl+"/"+transactionType.id ,transactionType )                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }


  delete (id: Number): Promise<TransactionType> {
    return this.http.delete(this.transactionTypesUrl+"/"+id )                             
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
