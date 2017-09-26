import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

// module components
import { PersonComponent } from './person/person.component';
import { PersonFormComponent } from './person-form/person-form.component';
import {PersonService} from './person/person.service';
import { LedgerComponent } from './ledger/ledger.component';
import { LedgerFormComponent } from './ledger-form/ledger-form.component';
import { AccountComponent } from './account/account.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { TransactionTypeComponent } from './transaction-type/transaction-type.component';
import { TransactionTypeFormComponent } from './transaction-type-form/transaction-type-form.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { TransactionDetailsFormComponent } from './transaction-details-form/transaction-details-form.component';
import { TransactionFilterComponent } from './transaction-filter/transaction-filter.component'

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [PersonComponent, PersonFormComponent, LedgerComponent, LedgerFormComponent, AccountComponent, AccountFormComponent, TransactionTypeComponent, TransactionTypeFormComponent, TransactionComponent, TransactionFormComponent, TransactionDetailsComponent, TransactionDetailsFormComponent, TransactionFilterComponent],
  providers: [ PersonService ]
})
export class CostModule { }
