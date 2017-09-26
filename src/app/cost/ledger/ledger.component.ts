import { Component, OnInit } from '@angular/core';
import {LedgerService} from './ledger.service'
import {Ledger} from './ledger'
import { Router, ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css'],
  providers:[LedgerService]
})
export class LedgerComponent implements OnInit {

  ledgers :Ledger[] ;
  errorMessage: string;
  
  constructor(private ledgerService:LedgerService ,
              private route: ActivatedRoute,
              private router: Router) 
  { }

  
  getLedgers() {
    this.ledgerService.getLedgers()
                     .then(
                       ledgers =>  this.ledgers = ledgers,
                       error =>  this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.getLedgers();
  }

   onSelect(ledger: Ledger) {
    this.router.navigate(['/ledger', ledger.id]);
  }

addNewLedger() {
    this.router.navigate(['/new-ledger']);
  }


}
