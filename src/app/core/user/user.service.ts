import { Injectable } from '@angular/core';
import {User} from './user'
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AlertService } from '../alert/alert.service';



@Injectable()
export class UserService {

  private usersUrl = 'http://testdomain.com:1111/user';  // URL to web API

  constructor(private http: Http,
              private alertService:AlertService) 
              { }
  
  getUsers (): Promise<User[]> {
    return this.http.get(this.usersUrl)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(e => this.handleError(e,this));
                   
  }

  getUser (id : number): Promise<User> {
    return this.http.get(this.usersUrl+"/"+id)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(e => this.handleError(e,this));
                   
  }


  create (user:User): Promise<User> {
    return this.http.post(this.usersUrl , user)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(e => this.handleError(e,this));
                   
  }


  update (user: User): Promise<User> {
    return this.http.put(this.usersUrl+"/"+user.id ,user )                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(e => this.handleError(e,this));
                   
  }


  delete (id: Number): Promise<User> {
    return this.http.delete(this.usersUrl+"/"+id )                             
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


  getCurrentUser (): Promise<User> {
    return this.http.get(this.usersUrl+"/"+1)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(e => this.handleError(e,this));
                   
  }

}
