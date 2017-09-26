import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup , Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {Ledger } from '../ledger/ledger';
import {LedgerService} from '../ledger/ledger.service'

@Component({
  selector: 'ledger-form',
  templateUrl: './ledger-form.component.html',
  styleUrls: ['./ledger-form.component.css'],
  providers:[LedgerService]
})
export class LedgerFormComponent implements OnInit {

  rForm : FormGroup;
  ledger : Ledger;
  
  submitted = false;
  onSubmit() { this.submitted = true; }

  constructor(private fb : FormBuilder , 
              private ledgerService:LedgerService, 
              private route: ActivatedRoute,
              private router: Router) {
    this.rForm = fb.group({
      'name': [null , Validators.required],
      'description': [null ,Validators.compose( [ Validators.maxLength(100)] )]
    })

   }

 ngOnInit() {

   if (this.route.params['value'].id)
    this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) => this.ledgerService.getLedger(this.route.params['value'].id))
      .subscribe((ledger: Ledger) => this.ledger = ledger);

      if (this.ledger == null)
        this.ledger = new Ledger();
  }

  addPost(ledger){
    console.log(ledger);
  }


  saveLedger(ledger){

    
    if (this.ledger.id){
     this.ledgerService.update(this.ledger);
    } else {
      this.ledgerService.create(this.ledger);
    }
    
    this.router.navigate(['/ledgers']);
  }  
  
  

  update(ledger){
    this.ledgerService.update(this.ledger);
    this.router.navigate(['/ledgers']);
    
  }

  deleteLedger(id){

    
    this.ledgerService.delete(this.ledger.id);
    this.ledgerService.getLedgers();
    this.router.navigate(['/ledgers']);
  }

}
