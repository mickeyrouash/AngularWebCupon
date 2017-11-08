import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Company } from './company.module';
import {Customer } from './customer.module';
import {ConstansModule } from './constans/constans.module';

@Injectable()
export class AdminService {
  // private allCompaniesMap = [];
  // use Map to get direct access via company ID
  private allCompaniesMap: Map<number, Company> = new Map<number, Company>();

  EditedCompany: Company;
  EditedCustomer: Customer;
  editMode = false;
  editModeCustomer = false;
  loginAs= '';
  username= '';

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
  addCompany(name, email, password) {
     const newCompany = new Company(name, email, password);
     // const newCompany = {compName: name , email: email , password: password};
      const headers = new Headers({'Content-Type': 'application/json'});
     return this.http.post(ConstansModule.WEBAPP_ADDRESS + 'admin/addcompany',
       newCompany,
       {headers: headers});
  }
   removeCompany(id) {
      // const newCompany = {compName: name , email: email , password: password};
      // const headers = new Headers({'Content-Type': 'application/json'});
     return this.http.delete(ConstansModule.WEBAPP_ADDRESS + 'admin/removecompany/' + id,
      ).map(success => success.status)
      .catch(this.handleError);
  }
  updateCompany(name, email, password, id) {
    const updateCompany = new Company(name, email, password , id);
    // const newCompany = {compName: name , email: email , password: password};
     const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(ConstansModule.WEBAPP_ADDRESS + 'admin/updatecompany',
          updateCompany,
      {headers: headers});
 }

  addCustomer(newCustomer) {
     // const newCustomer = {custName: name , password: password};
      const headers = new Headers({'Content-Type': 'application/json'});
     return this.http.post(ConstansModule.WEBAPP_ADDRESS + 'admin/addcustomer',
       newCustomer,
       {headers: headers});
  }
  viewAllCompaniesMap() {
    return this.allCompaniesMap;
  }
  getCompany(company: Company) {
     return this.allCompaniesMap.get(company.ID)
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
  getCustomers() {
     // const headers = new Headers({'Access-Control-Allow-Origin' : '*'});
    return this.http.get(ConstansModule.WEBAPP_ADDRESS + 'admin/getallcustomers' )
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
  // get if it administrator,company or customer
  getLoginAs() {
    // const headers = new Headers({'Access-Control-Allow-Origin' : '*'});
  return this.http.get(ConstansModule.WEBAPP_ADDRESS + 'admin/getloginas')
    .map(
      (response: Response) => {
        const data = response.text();
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
// get if it administrator,company or customer
getUsernam() {
  // const headers = new Headers({'Access-Control-Allow-Origin' : '*'});
return this.http.get(ConstansModule.WEBAPP_ADDRESS + 'admin/getusername')
  .map(
    (response: Response) => {
      const data = response.text();
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
  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
      }
}
