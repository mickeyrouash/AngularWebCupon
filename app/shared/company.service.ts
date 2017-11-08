import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Company } from './company.module';
import {Customer } from './customer.module';
import {Coupon } from './coupon.module';
import {ConstansModule } from './constans/constans.module';

@Injectable()
export class CompanyService {
  // private allCompaniesMap = [];
  // use Map to get direct access via company ID
  private allCompaniesMap: Map<number, Company> = new Map<number, Company>();

  EditedCompany: Company;
  EditedCoupon: Coupon;
  EditedCustomer: Customer;
  editMode = false;
  editModeCoupon = false;
  editModeCustomer = false;

  constructor(private http: Http) {}
  updateCustomer(customer: Customer) {
    // const newCompany = {compName: name , email: email , password: password};
     const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(ConstansModule.WEBAPP_ADDRESS + 'company/updatecustomer',
    customer,
      {headers: headers});
 }
 addCustomer(newCustomer) {
  // const newCustomer = {custName: name , password: password};
   const headers = new Headers({'Content-Type': 'application/json'});
  return this.http.post(ConstansModule.WEBAPP_ADDRESS + 'company/addcustomer',
    newCustomer,
    {headers: headers});
}
 removeCustomer(id) {
  // const newCompany = {compName: name , email: email , password: password};
  // const headers = new Headers({'Content-Type': 'application/json'});
 return this.http.delete(ConstansModule.WEBAPP_ADDRESS + 'admin/removecustomer/' + id,
  ).map(success => success.status)
  .catch(this.handleError);
}

   removeCoupon(id) {
      // const newCompany = {compName: name , email: email , password: password};
      // const headers = new Headers({'Content-Type': 'application/json'});
     return this.http.delete(ConstansModule.WEBAPP_ADDRESS + 'company/removecoupon/' + id,
      ).map(success => success.status)
      .catch(this.handleError);

    }
  updateCoupon(coupon: Coupon) {
   // const updateCompany = new Company(name, email, password , id);
    // const newCompany = {compName: name , email: email , password: password};
     const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(ConstansModule.WEBAPP_ADDRESS + 'company/updatecoupon',
               coupon,
      {headers: headers});
 }


  viewAllCompaniesMap() {
    return this.allCompaniesMap;
  }

   getCompanies() {
      const headers = new Headers({'Access-Control-Allow-Origin' : '*'});
    return this.http.get(ConstansModule.WEBAPP_ADDRESS + 'admin/getallcompanies')
      .map(
        (response: Response) => {
           const data = response.json();
          console.log(data);
         for (const company of data) {
           this.allCompaniesMap.set(company.ID , company)
          }
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('some error oucure');
        }
      );
  }

  // get customers list
  getCustomers() {
     // const headers = new Headers({'Access-Control-Allow-Origin' : '*'});
    return this.http.get(ConstansModule.WEBAPP_ADDRESS + 'company/getallcustomers' )
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
          console.log(error);
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

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
      }
}
