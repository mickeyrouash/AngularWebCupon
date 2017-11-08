import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ConstansModule {
  public static HOST= 'localhost';
  // public static HOST= 'mickey-coupon1.uksouth.cloudapp.azure.com';
  public static WEBAPP_ADDRESS= 'http://' + ConstansModule.HOST + ':8080/CouponSystemWeb/webapi/';
  public static LOGOUT_PAGE= 'http://' + ConstansModule.HOST + ':8080/CouponSystemWeb/LogoutServlet';



}
