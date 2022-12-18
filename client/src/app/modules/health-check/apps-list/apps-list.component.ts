import { Component, Injector, OnInit } from '@angular/core';
import { AppService } from 'src/app/modules/shared/services/app.service';

@Component({
  selector: 'apps-list',
  templateUrl: './apps-list.component.html',
  styleUrls: ['./apps-list.component.scss']
})
export class AppsListComponent implements OnInit {

  constructor(
    private _Injector: Injector,
  ) { }

  apps: any = []

  async ngOnInit() {
    this.apps = await this.fetchUserAppsServiceFunction()
  }

  /**
   * Fetch Applications
   * @returns 
   */
  fetchUserAppsServiceFunction() {
    return new Promise((resolve, reject) => {
      let appService = this._Injector.get(AppService)
      appService.fetchUserApps()
        .then((res: any) => {
          resolve(res['apps'])
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  newApp($event: any) {
    this.apps.unshift($event)
  }

  removeApp($event: any){
    let index = this.apps.findIndex((app: any) => app._id == $event)
    if (index != -1)
      this.apps.splice(index, 1)
  }

  trackByElement(index: number, element: any): number {
    return element.id
  }

}
