import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/modules/shared/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.scss']
})
export class AppCardComponent implements OnInit {

  constructor(
    private _Injector: Injector
  ) { }

  // App Object
  @Input('app') app: any = {}

  // Remove App Event Emitter
  @Output('remove') removeAppEmitter = new EventEmitter<any>()

  ngOnInit(): void {
  }

  removeAppFunction(appId: any) {
    return new Promise((resolve, reject) => {
      let appService = this._Injector.get(AppService)
      appService.removeApp(appId)
        .then((res: any) => {
          resolve(res['app'])
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  async removeApp(appId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will remove the entire app, all the related APIs, and scheduled Jobs!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1d4ed8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeAppFunction(appId)
          .then((app) => {
            console.log(app)
            Swal.fire(
              'Deleted!',
              'Your app has been removed from the system!',
              'success'
            ).then(() => {
              this.removeAppEmitter.emit(appId)
            })
          })
      }
    })
  }

}
