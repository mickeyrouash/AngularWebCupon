import { Component, OnInit , OnDestroy , Input , Output} from '@angular/core';
import { NgForm} from '@angular/forms'
import { Subscription } from 'rxjs/Subscription';
import { ViewChild } from '@angular/core';

import { AdminService } from '../../../shared/admin.service';
import { CompanyService } from '../../../shared/company.service';
import { Company } from '../../../shared/company.module';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit, OnDestroy {

  adminService: AdminService ;
  companyService: CompanyService ;
  editMode = false ;
  editedCompany: Company;
  constructor(adminService: AdminService, companyService: CompanyService) {
    this.adminService = adminService;
    this.companyService = companyService;
  }

  ngOnInit() {
    // give default : empty value
    this.editMode = false ;
    this.editedCompany = new Company('' , '' , '' , 0);
    if ( this.adminService.editMode === true ) {
      this.editedCompany = this.adminService.EditedCompany;
      this.adminService.editMode = true;
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
    if (! this.editMode ) {
      this.adminService.addCompany(value.name , value.email,
                                value.password).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
      // else is update mode
    }else {
      this.adminService.updateCompany(value.name , value.email,
        value.password, this.editedCompany.ID).subscribe(
           (response) => console.log(response),
           (error) => console.log(error)
);
      console.log('update ' +  value.name + 'ID: ' + this.editedCompany.ID) ;
    }
    submittedForm.reset();
  }
  ngOnDestroy() {
    this.adminService.editMode = false;
  }
}
