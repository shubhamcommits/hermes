import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/modules/shared/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent implements OnInit {

  constructor(
    private _Injector: Injector,
    private _Route: ActivatedRoute
  ) { }

  // New Service Event Emitter
  @Output('newService') service = new EventEmitter<any>()

  // App ID
  appId = this._Route.snapshot.paramMap.get('appId');

  swal: any = {
    title: 'Your new service!',
    input: 'text',
    showDenyButton: true,
    confirmButtonText: 'Create!',
    denyButtonText: 'Cancel',
  }

  ngOnInit(): void {
  }

  createNewServiceFunction(userData: any) {
    return new Promise((resolve, reject) => {
      let appService = this._Injector.get(AppService)
      appService.createService(userData)
        .then((res: any) => {
          resolve(res['service'])
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  public async createNewService(appName: any) {

    // Create new App
    await this.createNewServiceFunction({
      name: appName,
      appId: this.appId
    }).then((res) => {

      // Emit the Output Source
      this.service.emit(res)

      // Fire the Success Event
      Swal.fire('Good Job!', 'Your service has been created', 'success')
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
