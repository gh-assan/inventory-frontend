import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing/app-routing.module';

// shared modules
import { SharedModule } from '../shared/shared.module';


import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AlertComponent } from './alert/alert.component';
import { CoreServicesComponent } from './core-services/core-services.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    UserComponent,
    FooterComponent,
    TopMenuComponent,
    NavigationMenuComponent,
    AlertComponent
  ],
  declarations: [FooterComponent, TopMenuComponent, NavigationMenuComponent, PageNotFoundComponent, 
                UserComponent, HomeComponent, UserFormComponent, AlertComponent, CoreServicesComponent]
  
})
export class CoreModule { }
