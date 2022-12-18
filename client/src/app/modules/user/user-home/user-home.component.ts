import { Component, Injector, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';



@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  constructor(
    private _Injector: Injector,
  ) { }

  user : any = JSON.parse(localStorage.getItem('user') || '')
password : any;
  async ngOnInit() {
    console.log(this.user)
    let userData = await this.userServiceFunction(this.user.auuid)
    console.log(userData)
    
  }

  userServiceFunction(userId :any) {
    return new Promise((resolve, reject) => {
      let userService = this._Injector.get(UserService)
      userService.getUser(userId)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }


}
