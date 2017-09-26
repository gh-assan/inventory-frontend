import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';

import {PersonComponent} from '../cost/person/person.component';
import {PersonFormComponent} from '../cost/person-form/person-form.component';

import {LedgerComponent} from '../cost/ledger/ledger.component';
import {LedgerFormComponent} from '../cost/ledger-form/ledger-form.component';

import {AccountComponent} from '../cost/account/account.component';
import {AccountFormComponent} from '../cost/account-form/account-form.component';

import {TransactionTypeComponent} from '../cost/transaction-type/transaction-type.component';
import {TransactionTypeFormComponent} from '../cost/transaction-type-form/transaction-type-form.component';

import {TransactionComponent} from '../cost/transaction/transaction.component';
import {TransactionFormComponent} from '../cost/transaction-form/transaction-form.component';
import {TransactionFilterComponent} from '../cost/transaction-filter/transaction-filter.component';

import {TransactionDetailsFormComponent} from '../cost/transaction-details-form/transaction-details-form.component';

import {ProductComponent} from '../inventory/product/product.component';
import {ProductFormComponent} from '../inventory/product-form/product-form.component';


import {PurchaseComponent} from '../inventory/purchase/purchase.component';


import {HomeComponent} from '../core/home/home.component';
import {UserComponent} from '../core/user/user.component';
import {UserFormComponent} from '../core/user-form/user-form.component';
import {PageNotFoundComponent} from '../core/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'persons', component: PersonComponent },
  { path: 'new-person', component: PersonFormComponent },
  { path: 'person/:id', component: PersonFormComponent },

  { path: 'ledgers', component: LedgerComponent },
  { path: 'new-ledger', component: LedgerFormComponent },
  { path: 'ledger/:id', component: LedgerFormComponent },
  

  { path: 'accounts', component: AccountComponent },
  { path: 'new-account', component: AccountFormComponent },
  { path: 'account/:id', component: AccountFormComponent },
  
  { path: 'transaction-types', component: TransactionTypeComponent },
  { path: 'new-transaction-type', component: TransactionTypeFormComponent },
  { path: 'transaction-type/:id', component: TransactionTypeFormComponent },
  
  { path: 'transactions', component: TransactionComponent },
  { path: 'transactions/filter', component: TransactionFilterComponent },
  { path: 'new-transaction', component: TransactionFormComponent },
  { path: 'transaction/:id', component: TransactionFormComponent },


  

  { path: 'transaction-details/:id', component: TransactionDetailsFormComponent },
  { path: 'new-transaction-details/:transaction_id', component: TransactionDetailsFormComponent },
  

  { path: 'products', component: ProductComponent },
  { path: 'new-product', component: ProductFormComponent },
  { path: 'product/:id', component: ProductFormComponent },

  { path: 'purchase/:id', component: PurchaseComponent },


  { path: 'users', component: UserComponent },
  { path: 'user/:id', component: UserFormComponent },
  { path: 'new-user', component: UserFormComponent },
  { path: '', component: HomeComponent },
  //{ path: '',   redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
