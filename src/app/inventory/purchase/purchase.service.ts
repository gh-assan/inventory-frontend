import { Injectable } from '@angular/core';
import {PurchaseItem} from './purchase-item'
import {PurchaseData} from './purchase-data'
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AlertService } from '../../core/alert/alert.service';


@Injectable()
export class PurchaseService {

  private purchasesUrl = 'http://testdomain.com:1111/purchase';  // URL to web API

  constructor(private http: Http,
              private alertService:AlertService) 
              { }
  
  

  getPurchase (id : number): Promise<PurchaseData> {
    return this.http.get(this.purchasesUrl+"/"+id)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(e => this.handleError(e,this));
                   
  }


  getPurchases (): Promise<PurchaseData[]> {
    return this.http.get(this.purchasesUrl)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(e => this.handleError(e,this));
                   
  }

  create (purchaseData:PurchaseData): Promise<PurchaseData> {
    return this.http.post(this.purchasesUrl , purchaseData)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(e => this.handleError(e,this));
                   
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any , _self  = this) {
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
    _self.alertService.error(errMsg);

    return //Observable.throw(errMsg);
  }



}
