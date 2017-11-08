import { Component, OnInit, OnDestroy} from '@angular/core';
import { Response } from '@angular/http';
import { Router , ActivatedRoute , Params } from '@angular/router';

import { AdminService } from '../../shared/admin.service';
import { Company } from '../../shared/company.module';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit , OnDestroy {
   companyData: Company[] ;
   adminService: AdminService ;
   errorMessage = '';
   filteredSearch = '';
   constructor(adminService: AdminService, private routes: Router ) {
    this.adminService = adminService;
  }

  ngOnInit() {
    this.viewAllCompanieis();
  }
  viewAllCompanieis() {
    this.adminService.getCompanies().subscribe(
        (companies: Company[]) => this.companyData = companies,
        (error) => console.log(error)
      );
  }
   deleteCompany(company) {
      this.adminService.removeCompany(company.ID).subscribe(
                        result => console.log(result),
                        error => this.errorMessage = error,
                        () => { this.viewAllCompanieis()}
      );
      console.log('delete ' + company.compName + ' ID:' + company.ID );
    }
    onEditCompany(company: Company) {
      // this.routes.navigate(['/create-company'])
      // console.log('edit ' + company.compName + ' ID:' + company.ID );
      this.adminService.EditedCompany = company;
      this.adminService.editMode = true;
      this.routes.navigate(['/app-company-edit']);
    }
    ngOnDestroy() { }


}
