import { Injectable } from '@angular/core';

import {Person} from './person'
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';



@Injectable()
export class PersonService {

  private personsUrl = 'http://localhost:1111/person';  // URL to web API

  constructor(private http: Http) { }
  
  getPersons (): Promise<Person[]> {
    return this.http.get(this.personsUrl)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }

  getPerson (id : number): Promise<Person> {
    return this.http.get(this.personsUrl+"/"+id)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }


  create (person:Person): Promise<Person> {
    return this.http.post(this.personsUrl , person)                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }


  update (person: Person): Promise<Person> {
    return this.http.put(this.personsUrl+"/"+person.id ,person )                             
                    .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
                   
  }


  delete (id: Number): Promise<Person> {
    return this.http.delete(this.personsUrl+"/"+id )                             
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
