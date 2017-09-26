import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup , Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {Person } from '../person/person';
import {PersonService} from '../person/person.service'

@Component({
  selector: 'person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  rForm : FormGroup;
  person : Person;
  description : string = '';
  name : string = '';


  submitted = false;
  onSubmit() { this.submitted = true; }

  constructor(private fb : FormBuilder , 
              private personService:PersonService, 
              private route: ActivatedRoute,
              private router: Router) {
    this.rForm = fb.group({
      'name': [null , Validators.required],
      'description': [null ,Validators.compose( [Validators.required , Validators.minLength(10) , Validators.maxLength(100)] )],
      'validate' : ''
    })

   }

 ngOnInit() {

   if (this.route.params['value'].id)
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.personService.getPerson(this.route.params['value'].id))
      .subscribe((person: Person) => this.person = person);

      if (this.person == null)
        this.person = new Person();
  }

  addPost(perosn){
    console.log(perosn);
  }


  savePerson(perosn){

    
    if (this.person.id){
     this.personService.update(this.person);
    } else {
      this.personService.create(this.person);
    }
    
    this.router.navigate(['/persons']);
  }  
  
  

  update(perosn){
    this.personService.update(this.person);
    this.router.navigate(['/persons']);
    
  }

  deletePerson(id){

    
    this.personService.delete(this.person.id);
    this.personService.getPersons();
    this.router.navigate(['/persons']);
  }

}
