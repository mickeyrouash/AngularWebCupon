import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Company } from './company.module';
import {Customer } from './customer.module';
import {ConstansModule } from './constans/constans.module';


@Injectable()
export class CustomerService {
  // private allCompaniesMap = [];
  // use Map to get direct access via company ID
  private allCompaniesMap: Map<number, Company> = new Map<number, Company>();

  EditedCompany: Company;
  EditedCustomer: Customer;
  editMode = false;
  editModeCustomer = false;

  constructor(private http: Http) {}
  updateCustomer(customer: Customer) {
    // const newCompany = {compName: name , email: email , password: password};
     const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(ConstansModule.WEBAPP_ADDRESS + 'admin/updatecustomer',
    customer,
      {headers: headers});
 }
 removeCustomer(id) {
  // const newCompany = {compName: name , email: email , password: password};
  // const headers = new Headers({'Content-Type': 'application/json'});
 return this.http.delete(ConstansModule.WEBAPP_ADDRESS + 'admin/removecustomer/' + id,
  ).map(success => success.status)
  .catch(this.handleError);
}
  viewAllCompaniesMap() {
    return this.allCompaniesMap;
  }

    getAllCoupons() {
      // const headers = new Headers({'Access-Control-Allow-Origin' : '*'});
    return this.http.get(ConstansModule.WEBAPP_ADDRESS + 'customer/getallcoupons')
      .map(
        (response: Response) => {
          const data = response.json();
          console.log(data);
         // for (const server of data) {
          //  server.name = 'FETCHED_' + server.name;
         // }
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('some error oucure');
        }
      );
  }
  getCompanyCoupons() {
    // const headers = new Headers({'Access-Control-Allow-Origin' : '*'});
  return this.http.get(ConstansModule.WEBAPP_ADDRESS + 'company/getallcoupons')
    .map(
      (response: Response) => {
        const data = response.json();
        console.log(data);
       // for (const server of data) {
        //  server.name = 'FETCHED_' + server.name;
       // }
        return data;
      }
    )
    .catch(
      (error: Response) => {
        return Observable.throw('some error oucure');
      }
    );
}


getCustomerBuysCoupons() {
  // const headers = new Headers({'Access-Control-Allow-Origin' : '*'});
return this.http.get(ConstansModule.WEBAPP_ADDRESS + 'customer/getbuyshistory')
  .map(
    (response: Response) => {
      const data = response.json();
      console.log(data);
     // for (const server of data) {
      //  server.name = 'FETCHED_' + server.name;
     // }
      return data;
    }
  )
  .catch(
    (error: Response) => {
      return Observable.throw('some error oucure');
    }
  );
}
  addCoupon(coupon) {
     // const newCoupon = {coupon};
      const headers = new Headers({'Content-Type': 'application/json'});
     return this.http.post(ConstansModule.WEBAPP_ADDRESS + 'company/addcoupon',
       coupon,
       {headers: headers});
  }
  buyCoupon(coupon) {
    // const newCoupon = {coupon};
     const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(ConstansModule.WEBAPP_ADDRESS + 'customer/buycoupon',
      coupon,
      {headers: headers}).catch(this.handleError);
 }
  private handleError (error: Response | any) {
    console.log( 'error.message:' + error.message );
    console.log( error.text());
    // console.error('inside handleError error.res.text() :' + error.res.text());
    return Observable.throw(error.text());
      }
}
