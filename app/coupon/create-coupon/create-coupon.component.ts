import { Component, OnInit , OnDestroy} from '@angular/core';
import { NgForm} from '@angular/forms'


import { Coupon } from '../../shared/coupon.module';
import { CompanyService } from '../../shared/company.service';

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css']
})
export class CreateCouponComponent implements OnInit, OnDestroy {
  // coponType = ['RESTURNTS', 'ELECTRICITY', 'FOOD', 'HEALTH', 'SPORTS', 'CAMPING', 'TRAVELLING'];
   coponType = [{value: 'RESTURNTS'}, {value: 'ELECTRICITY'}, {value: 'FOOD'},
                {value: 'HEALTH'}, {value: 'SPORTS'}, {value: 'CAMPING'}, {value: 'TRAVELLING'} ]
    imagePath: Map<string, string> = new Map([['RESTURNTS', 'images-coupons/RESTURNTS.jpg'],
                                                     ['ELECTRICITY', 'images-coupons/ELECTRICITY.jpg'],
                                                     ['FOOD', 'images-coupons/FOOD.jpg'],
                                                     ['HEALTH', 'images-coupons/HEALTH.jpg'],
                                                     ['SPORTS', 'images-coupons/SPORTS.jpg'],
                                                     ['CAMPING', 'images-coupons/CAMPING.jpg'],
                                                     ['TRAVELLING', 'images-coupons/TRAVELLING.jpg']
                                                    ]);


  // get the seleced type
 selectedType = '';

 compService: CompanyService ;
 couponData: Coupon;
 editMode = false ;
 editedCoupon: Coupon;
  constructor(compService: CompanyService ) {
    this.compService = compService;
  }
  ngOnInit() {
    this.editMode = false ;
    // give default values
    this.editedCoupon = new Coupon(0 , '', 0, '', '',  new Date('February 4, 2016') , new Date('February 4, 2016'), 0, '');
    if ( this.compService.editModeCoupon === true ) {
      this.editedCoupon = this.compService.EditedCoupon;
      this.selectedType = this.editedCoupon.type ;
      this.compService.editModeCoupon = true;
      this.editMode = true;
   }
  }
   onClear(submittedForm: NgForm) {
    submittedForm.reset();
  }
  onSubmit(submittedForm: NgForm) {
    if ( submittedForm.invalid ) {
      return ;
    }
     console.log(submittedForm);
     const value = submittedForm.value;
     this.couponData = new Coupon(this.editedCoupon.ID, value.title, value.amount,
                             value.message, value.type, value.endDate,
                             value.startDate , value.price , value.image)
    if (! this.editMode ) {
      this.compService.addCoupon(this.couponData).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }else {
      this.compService.updateCoupon(this.couponData).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
    submittedForm.reset();
  }

  getImagePath(  ) {
    return this.imagePath.get(this.selectedType);
  }
  ngOnDestroy() {
    this.compService.editModeCoupon = false;
  }

}
