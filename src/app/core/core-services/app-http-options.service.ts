import { Injectable } from '@angular/core';

import {RequestOptions, Request, RequestMethod , Headers ,URLSearchParams} from '@angular/http';
import {HttpQueryItem} from './http-query-item';

@Injectable()
export class AppHttpOptionsService {

  constructor() { }

  getNewOptions  (): RequestOptions {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'q=0.8;application/json;q=0.9');
    //let authToken = this._user.getUser().JWT;    
    //headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({ headers: headers });

    return options;

  }


  setUrlParams (options:RequestOptions , param: any): RequestOptions {
    
      let params: URLSearchParams = new URLSearchParams();
      for (var key in param) {
          if (param.hasOwnProperty(key)) {
              let val = param[key];
              params.set(key, val);
          }
      }
      options.params =  params ;
      

    return options;

  }

  setBody (options:RequestOptions , query: HttpQueryItem[] = [], offset:number =0, limit:number =100, orderBy:string ='1', orderType:string="desc"): RequestOptions {
    
    /*
     let filter = [];  
      
     for (var key in query) {
          if (query.hasOwnProperty(key)) {
              let val = query[key];
              filter[key] =  val;
          }
      }
      
      */

      let body = {
        "query":query , 
        "offset": offset , 
        "limit" : limit , 
        "order" : orderBy , 
        "orderType" : orderType
      };

      options.body = JSON.stringify(body);
      

    return options;

  }


  getFilterBody (query: HttpQueryItem[] = [], limit:string ='100' , offset:string ='0', orderBy:string ='1', orderType:string="desc"): any {
        
      let body = {
        "query":query , 
        "offset": offset , 
        "limit" : limit , 
        "order" : orderBy , 
        "orderType" : orderType
      };

    return body;

  }

}
