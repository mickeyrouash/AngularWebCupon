import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { HttpModule } from '@angular/http';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { AppComponent } from './app.component';
import { CompanyService } from './shared/company.service';
import { AdminService } from './shared/admin.service';
import { CustomerService } from './shared/customer.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CouponComponent } from './coupon/coupon.component';
import { CouponsListComponent } from './coupon/coupons-list/coupons-list.component';
import { CreateCouponComponent } from './coupon/create-coupon/create-coupon.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyEditComponent } from './company/company-list/company-edit/company-edit.component'
import { FilterPipe } from './shared/filter.pipe';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CustomerCouponComponent } from './coupon/coupons-list/customer-coupon/customer-coupon.component';

const routes = [
  {path: '' , component: HomeComponent },
  {path: 'app-company-edit' , component: CompanyEditComponent },
  {path: 'create-customer' , component: CreateCustomerComponent },
  {path: 'app-company-list' , component: CompanyListComponent },
  {path: 'app-view-customers' , component: ViewCustomersComponent },
  {path: 'app-coupons-list' , component: CouponsListComponent },
  {path: 'app-create-coupon' , component: CreateCouponComponent },
  {path: 'app-customer-coupon' , component: CustomerCouponComponent },
  {path: '**' , redirectTo: '/'  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ViewCustomersComponent,
    CreateCustomerComponent,
    CouponComponent,
    CouponsListComponent,
    CreateCouponComponent,
    DropdownDirective,
    CompanyListComponent,
    CompanyEditComponent,
    FilterPipe,
    SidebarComponent,
    CustomerCouponComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot()
   ],
  providers: [CompanyService, AdminService, CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
