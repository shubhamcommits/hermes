import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/modules/shared/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.scss']
})
export class CreateAppComponent implements OnInit {

  constructor(
    private _Injector: Injector
  ) { }

  // New App Event Emitter
  @Output('newApp') app = new EventEmitter<any>()

  swal: any = {
    title: 'Your new application!',
    input: 'text',
    showDenyButton: true,
    confirmButtonText: 'Create!',
    denyButtonText: 'Cancel',
  }

  ngOnInit(): void {
  }

  createNewAppServiceFunction(userData: any) {
    return new Promise((resolve, reject) => {
      let appService = this._Injector.get(AppService)
      appService.createApp(userData)
        .then((res: any) => {
          resolve(res['app'])
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  public async createNewApp(appName: any) {

    // Create new App
    await this.createNewAppServiceFunction({
      name: appName
    }).then((res) => {

      // Emit the OutputSource
      this.app.emit(res)

      // Fire the Success Event
      Swal.fire('Good Job!', 'Your application has been created', 'success')
    })
      .catch(() => {
        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Something went wrong!',  
          footer: '<a href>Why do I have this issue?</a>'  
        }) 
      })


  }

  public handleDenial() {
  }

  public handleDismiss(dismissMethod: any): void {
    // dismissMethod can be 'cancel', 'overlay', 'close', and 'timer'
    // ... do something
  }

}
