import { Component, OnInit } from '@angular/core';
import {UserService} from './user.service'
import {User} from './user'
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlertService } from '../alert/alert.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[UserService]
})
export class UserComponent implements OnInit {

  users :User[] ;
  errorMessage: string;
  //mode = 'Observable';

  constructor(private userService:UserService,
              private alertService:AlertService,
              private route: ActivatedRoute,
              private router: Router) { }

  
  getUsers() {
    this.userService.getUsers()
                     .then(
                       users =>  this.users = users,
                       error =>  {
                                    this.errorMessage = <any>error ; 
                                    console.error(this.errorMessage);                                   
                                    this.alertService.error(this.errorMessage);
                                 });
  }

  ngOnInit() {
    this.getUsers();
  }


  onSelect(user: User) {
    this.router.navigate(['/user', user.id]);
  }

addNewUser() {
    this.router.navigate(['/new-user']);
  }

}
