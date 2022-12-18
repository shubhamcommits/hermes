import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/modules/shared/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.scss']
})
export class AppDetailsComponent implements OnInit {

  constructor(
    private _Injector: Injector,
    private _Route: ActivatedRoute
  ) { }

  // App ID
  appId = this._Route.snapshot.paramMap.get('appId');

  services: any = []

  async ngOnInit() {
    this.services = await this.fetchUserServiceFunction()
    console.log("Services" , this.services)
  }

  fetchUserServiceFunction() {
    return new Promise((resolve, reject) => {
      let appService = this._Injector.get(AppService)
      appService.fetchUserServices(this.appId)
        .then((res: any) => {
          resolve(res['services'])
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  removeServiceFunction(serviceId: any) {
    return new Promise((resolve, reject) => {
      let appService = this._Injector.get(AppService)
      appService.removeService(serviceId)
        .then((res: any) => {
          resolve(res['service'])
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  newService($event: any) {
    this.services.unshift($event)
  }

  trackByElement(index: number, element: any): number {
    return element.id
  }

  async removeService(serviceId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will remove the entire service, all the related APIs, and scheduled Jobs!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1d4ed8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeServiceFunction(serviceId)
          .then((service) => {
            console.log(service)
            Swal.fire(
              'Deleted!',
              'Your service has been removed from the system!',
              'success'
            ).then(() => {
              let index = this.services.findIndex((service: any) => service._id == serviceId)
              if (index != -1)
                this.services.splice(index, 1)
            })
          })
      }
    })
  }
}
