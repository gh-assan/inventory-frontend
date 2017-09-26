import { Component, OnInit } from '@angular/core';
import {PersonService} from './person.service'
import {Person} from './person'
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers:[PersonService]
})
export class PersonComponent implements OnInit {

  persons :Person[] ;
  errorMessage: string;
  
  constructor(private personService:PersonService ,
              private route: ActivatedRoute,
              private router: Router) 
  { }

  
  getPersons() {
    this.personService.getPersons()
                     .then(
                       persons =>  this.persons = persons,
                       error =>  this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.getPersons();
  }

   onSelect(person: Person) {
    this.router.navigate(['/person', person.id]);
  }

addNewPerson() {
    this.router.navigate(['/new-person']);
  }


}
