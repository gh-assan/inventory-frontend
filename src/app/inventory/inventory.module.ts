import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

// module components
import { ProductComponent } from './product/product.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { PurchaseComponent } from './purchase/purchase.component';



@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ProductComponent, ProductTypeComponent, ProductFormComponent, PurchaseComponent]
})
export class InventoryModule { }
