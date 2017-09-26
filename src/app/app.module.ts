import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';


//routing
import { AppRoutingModule } from './app-routing/app-routing.module';

// Shared modules 
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// Application modules
import { CostModule } from './cost/cost.module';
import { InventoryModule } from './inventory/inventory.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    CostModule,
    InventoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
