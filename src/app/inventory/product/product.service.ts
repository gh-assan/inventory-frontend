import { Injectable } from '@angular/core';
import {Product} from './product'
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AlertService } from '../../core/alert/alert.service';


@Injectable()
export class ProductService {

  private productsUrl = 'http://testdomain.com:1111/product';  // URL to web API

  constructor(private http: Http,
              private alertService:AlertService) 
              { }
  
  getProducts (): Promise<Product[]> {
    return this.http.get(this.productsUrl)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(e => this.handleError(e,this));
                   
  }

  getProduct (id : number): Promise<Product> {
    return this.http.get(this.productsUrl+"/"+id)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(e => this.handleError(e,this));
                   
  }


  create (product:Product): Promise<Product> {
    return this.http.post(this.productsUrl , product)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(e => this.handleError(e,this));
                   
  }


  update (product: Product): Promise<Product> {
    return this.http.put(this.productsUrl+"/"+product.id ,product )                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(e => this.handleError(e,this));
                   
  }


  delete (id: Number): Promise<Product> {
    return this.http.delete(this.productsUrl+"/"+id )                             
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
