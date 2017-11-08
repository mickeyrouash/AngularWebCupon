import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router , ActivatedRoute , Params } from '@angular/router';

import { CompanyService } from '../shared/company.service'
import { AdminService } from '../shared/admin.service'
import { Customer } from '../shared/customer.module'

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent implements OnInit {
  customerData: Customer[]; // [{name: 'comp', email: 'email1' , password: 'ppp'}];
  compService: CompanyService ;
  adminService: AdminService ;
  errorMessage;
  filteredSearch = '';
  constructor(compService: CompanyService , adminService: AdminService , private routes: Router ) {
    this.compService = compService;
    this.adminService = adminService;
  }

  ngOnInit() {
    if (  this.adminService.loginAs === 'Company') {
      this.viewAllCompanyCustomer();
    }
    if (  this.adminService.loginAs === 'Administrator') {
      this.viewAllCustomer();
    }

    }
  viewAllCompanyCustomer() {
    this.compService.getCustomers().subscribe(
        (customers: any[]) => this.customerData = customers,
        (error) => console.log(error)
      );
  }
  viewAllCustomer() {
    this.adminService.getCustomers().subscribe(
        (customers: any[]) => this.customerData = customers,
        (error) => console.log(error)
      );
  }

  deleteCustomer(customer: Customer) {

    if (  this.adminService.loginAs === 'Company') {
      this.compService.removeCustomer(customer.ID).subscribe(
        result => console.log(result),
        (response) => console.log(response),
        () => { this.viewAllCustomer()  }
);
  console.log('delete ' + customer.custName + ' ID:' + customer.ID );
    }
    if (  this.adminService.loginAs === 'Administraror') {
      this.adminService.removeCustomer(customer.ID).subscribe(
        result => console.log(result),
        (response) => console.log(response),
        () => { this.viewAllCustomer()  }
);
  console.log('delete ' + customer.custName + ' ID:' + customer.ID );
    }
  }
  onEditCustomer(customer: Customer) {
    // this.routes.navigate(['/create-company'])
    // console.log('edit ' + company.compName + ' ID:' + company.ID );
    this.compService.EditedCustomer = customer;
    this.compService.editModeCustomer = true;
    this.routes.navigate(['/create-customer']);
  }


}
