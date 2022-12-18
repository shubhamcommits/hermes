import { Component, EventEmitter, Inject, Injector, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/modules/shared/services/app.service';
import Swal from 'sweetalert2';
import { CreateApiModalComponent } from './create-api-modal/create-api-modal.component';

@Component({
  selector: 'app-create-api',
  templateUrl: './create-api.component.html',
  styleUrls: ['./create-api.component.scss']
})
export class CreateApiComponent implements OnInit {

  constructor(
    private _Route: ActivatedRoute,
    private _Injector: Injector,
    public _Dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  // App ID
  appId = this._Route.snapshot.paramMap.get('appId')

  // Service ID
  serviceId = this._Route.snapshot.paramMap.get('serviceId')

  // New Service Event Emitter
  @Output('newApi') api = new EventEmitter<any>()

  createNewApiFunction(apiData: any) {
    return new Promise((resolve, reject) => {
      let appService = this._Injector.get(AppService)
      appService.createApi(apiData)
        .then((res: any) => {
          resolve(res['api'])
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  /**
   * This function opens the create API Details 
   */
  openCreateApiDialog() {
    const dialogRef = this._Dialog.open(CreateApiModalComponent, {
      maxWidth: '100%',
      maxHeight: '100%',
      width: '80%',
      height: '80%',
      autoFocus: true,
      hasBackdrop: true,
      disableClose: true,
      closeOnNavigation: true,
      panelClass: 'modal-class'
    });

    dialogRef.afterClosed().subscribe(
      async (data: any) => {
        if (JSON.stringify(data) != JSON.stringify(undefined)) {

          // Append AppID
          data.appId = this.appId

          // Append ServiceId
          data.serviceId = this.serviceId
          
          await this.createNewApiFunction(data)
            .then((res) => {

              // Emit the Output Source
              this.api.emit(res)

              // Fire the Success Event
              Swal.fire('Good Job!', 'Your API has been created', 'success')
            })
            .catch(() => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong, please try again!'
              })
            })
        }
      }
    )
  }



}
