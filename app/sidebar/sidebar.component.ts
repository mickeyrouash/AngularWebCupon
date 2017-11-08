import { Component, OnInit } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { Router , ActivatedRoute , Params } from '@angular/router';

import { AdminService } from '../shared/admin.service'
import {ConstansModule } from '../shared/constans/constans.module';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public customClass  = 'customClass';
  public isFirstOpen  = false;
  adminService: AdminService ;
  username = 'username';
  loginAs = 'default';
  logout_page = ConstansModule.LOGOUT_PAGE ;
  constructor(adminService: AdminService , private routes: Router) {
    this.adminService = adminService;
  }

  ngOnInit() {

    this.getUsername();
    this.getLoginAs();
  }
  getUsername() {
    this.adminService.getUsernam().subscribe(
        (username: string) => {this.username = username; this.adminService.username = username  },
        (error) => console.log(error)
      );
  }
   getLoginAs() {
    this.adminService.getLoginAs().subscribe(
        (loginAs: string) => {this.loginAs = loginAs , this.adminService.loginAs = loginAs },
        (error) => console.log(error)
      );
  }

}
