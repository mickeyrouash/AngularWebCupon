import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { CompanyService } from '../../shared/company.service';
import { AdminService } from '../../shared/admin.service';
import { CustomerService } from '../../shared/customer.service';

import { Coupon } from '../../shared/coupon.module';
import { Router , ActivatedRoute , Params } from '@angular/router';

@Component({
  selector: 'app-coupons-list',
  templateUrl: './coupons-list.component.html',
  styleUrls: ['./coupons-list.component.css']
})
export class CouponsListComponent implements OnInit {

  couponData = [];
  compService: CompanyService ;
  adminService: AdminService ;
  customerService: CustomerService ;
  filteredSearch = '';
  errorMessage = '';
  loginAs = '';
  isErrorHappend = false ;
  selectedIndex = -1 ;  // buy cuopon selected index
  constructor(compService: CompanyService , adminService: AdminService, customerService: CustomerService, private routes: Router) {
    this.compService = compService;
    this.adminService = adminService;
    this.customerService = customerService;
  }

  ngOnInit() {
    if ( this.adminService.loginAs  === 'Company') {
       this.viewCoupons()
    }else if (this.adminService.loginAs  === 'Customer') {
      this.viewAllCoupons();
    }
    this.loginAs = this.adminService.loginAs;

  }
  viewCoupons() {
    this.compService.getCompanyCoupons().subscribe(
        (coupons: any[]) => this.couponData = coupons,
        (error) => console.log(error)
      );
    }
   // see all available coupons
    viewAllCoupons() {
      this.customerService.getAllCoupons().subscribe(
          (coupons: any[]) => this.couponData = coupons,
          (error) => console.log(error)
        );
      }
      deleteCoupon(coupon: Coupon) {
        this.compService.removeCoupon(coupon.ID).subscribe(
                          result => console.log(result),
                          error => this.errorMessage = error,
                          () => { this.viewCoupons()}
        );
        console.log('delete ' + coupon.title + ' ID:' + coupon.ID );
      }
  onBuyCoupon(coupon: Coupon , selectedIndex) {
      this.selectedIndex = selectedIndex ;
      this.customerService.buyCoupon(coupon).subscribe(
                          result => console.log(result),
                          error => {this.errorMessage = error ;
                              console.log('buy  ' + coupon.title + ' ID:' + coupon.ID  + ' error: ' + this.errorMessage),
                              this.isErrorHappend = true},
                          () => { this.viewAllCoupons()}
        );

      }
    onEditCoupon(coupon: Coupon) {
      // this.routes.navigate(['/create-company'])
      // console.log('edit ' + company.compName + ' ID:' + company.ID );
      this.compService.EditedCoupon = coupon;
      this.compService.editModeCoupon = true;
      this.routes.navigate(['/app-create-coupon']);
    }



}
