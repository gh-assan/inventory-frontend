import { Injectable } from '@angular/core';

import {Ledger} from './ledger'
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';



@Injectable()
export class LedgerService {

  private ledgersUrl = 'http://localhost:1111/ledger';  // URL to web API

  constructor(private http: Http) { }
  
  getLedgers (): Promise<Ledger[]> {
    return this.http.get(this.ledgersUrl)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }

  getLedger (id : number): Promise<Ledger> {
    return this.http.get(this.ledgersUrl+"/"+id)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }


  create (ledger:Ledger): Promise<Ledger> {
    return this.http.post(this.ledgersUrl , ledger)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }


  update (ledger: Ledger): Promise<Ledger> {
    return this.http.put(this.ledgersUrl+"/"+ledger.id ,ledger )                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }


  delete (id: Number): Promise<Ledger> {
    return this.http.delete(this.ledgersUrl+"/"+id )                             
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
