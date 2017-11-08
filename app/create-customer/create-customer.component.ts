import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';

import { CustomerService } from '../shared/customer.service';
import { AdminService } from '../shared/admin.service';
import { CompanyService } from '../shared/company.service';
import { Customer} from '../shared/customer.module';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
   editMode = false ;
   customerService: CustomerService ;
   adminService: AdminService ;
   companyService: CompanyService ;
   editedCustomer: Customer;
  constructor(customerService: CustomerService ,  adminService: AdminService , companyService: CompanyService ) {
    this.customerService = customerService;
    this.adminService = adminService;
    this.companyService = companyService;
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
     const submitedCustomer = new Customer(value.name , value.password, this.editedCustomer.ID)
     // check if to create or to update customer
     if (  this.adminService.loginAs === 'Administraror') {
      if (! this.editMode ) {
        this.adminService.addCustomer(submitedCustomer).subscribe(
           (response) => console.log(response),
           (error) => console.log(error)
           );
       }else {
          this.customerService.updateCustomer(submitedCustomer).subscribe(
            (response) => console.log(response),
            (error) => console.log(error));
          console.log('update ' +  value.name + 'ID: ' + this.editedCustomer.ID) ;
        }
     }
     if (  this.adminService.loginAs === 'Company') {
      if (! this.editMode ) {
        this.companyService.addCustomer(submitedCustomer).subscribe(
           (response) => console.log(response),
           (error) => console.log(error)
           );
       }else {
          this.companyService.updateCustomer(submitedCustomer).subscribe(
            (response) => console.log(response),
            (error) => console.log(error));
          console.log('update ' +  value.name + 'ID: ' + this.editedCustomer.ID) ;
        }
     }

    submittedForm.reset();
  }


  ngOnInit() {
    this.editMode = false ;
    this.editedCustomer = new Customer('' , '' , 0);
    if ( this.customerService.editModeCustomer === true ) {
      this.editedCustomer = this.customerService.EditedCustomer;
      this.customerService.editModeCustomer = true;
      this.editMode = true;
   }
  }

}
