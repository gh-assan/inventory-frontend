import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule,JsonpModule } from '@angular/http';

import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';

import { AppHttpOptionsService } from '../core/core-services/app-http-options.service';
import { AlertService } from '../core/alert/alert.service';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule , 
    FormsModule
    
  ],
  exports:[
    CommonModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule , 
    FormsModule
        
  ],
  declarations: [],
  providers: [AlertService,AppHttpOptionsService]
})
export class SharedModule { }
