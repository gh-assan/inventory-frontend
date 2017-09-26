import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup , Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {User} from '../user/user'
import {UserService} from '../user/user.service'

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  providers:[UserService]
})
export class UserFormComponent implements OnInit {

 rForm : FormGroup;
  user : User;
  
  submitted = false;
  onSubmit() { this.submitted = true; }

  constructor(private fb : FormBuilder , 
              private userService:UserService, 
              private route: ActivatedRoute,
              private router: Router) {
    this.rForm = fb.group({
      'first_name': [null ,Validators.compose( [Validators.required , Validators.minLength(1) , Validators.maxLength(100)] )],
      'last_name': [null ,Validators.compose( [Validators.required , Validators.minLength(1) , Validators.maxLength(100)] )],
      'email': [null ,Validators.compose( [Validators.required , Validators.email] )],
      'is_active':[]
    })

   }

 ngOnInit() {

   if (this.route.params['value'].id)
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.userService.getUser(this.route.params['value'].id))
      .subscribe((user: User) => this.user = user);

      if (this.user == null)
        this.user = new User();
  }

  addPost(user){
    console.log(user);
  }


  saveUser(user){

    
    if (this.user.id){
     this.userService.update(this.user);
    } else {
      this.userService.create(this.user);
    }
    
    this.router.navigate(['/users']);
  }  
  
  

  update(user){
    this.userService.update(this.user);
    this.router.navigate(['/users']);
    
  }

  deleteUser(id){

    
    this.userService.delete(this.user.id);
    this.userService.getUsers();
    this.router.navigate(['/users']);
  }

}
