import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { CompanyService } from '../../../shared/company.service';
import { AdminService } from '../../../shared/admin.service';
import { CustomerService } from '../../../shared/customer.service';

import { Coupon } from '../../../shared/coupon.module';
import { Router , ActivatedRoute , Params } from '@angular/router';

@Component({
  selector: 'app-customer-coupon',
  templateUrl: './customer-coupon.component.html',
  styleUrls: ['./customer-coupon.component.css']
})
export class CustomerCouponComponent implements OnInit {
  couponData = [];


  customerService: CustomerService ;
  filteredSearch = '';
  errorMessage = '';
  loginAs = '';
  constructor( customerService: CustomerService, private routes: Router) {
    this.customerService = customerService;
  }

  ngOnInit() {
    this.getCustomerBuysCoupons();

  }

   // see all available coupons
   getCustomerBuysCoupons() {
      this.customerService.getCustomerBuysCoupons().subscribe(
          (coupons: any[]) => this.couponData = coupons,
          (error) => console.log(error)
        );
      }




}
