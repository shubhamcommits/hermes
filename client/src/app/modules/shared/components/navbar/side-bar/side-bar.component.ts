import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor() { }

  // SideNav Input
  @Input('sideNav') sideNav: any;

  // User Input
  @Input('user') user: any

  ngOnInit(): void { }

  checkEmptyObject(object: any) {
    return JSON.stringify("{}") == JSON.stringify(object)
  }

}
