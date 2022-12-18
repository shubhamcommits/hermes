import { Component, Injector, OnInit } from '@angular/core';
import { AppService } from 'src/app/modules/shared/services/app.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  constructor(
    private _Injector: Injector,
  ) { }

  // Is loading behaviour
  isLoading$ = new BehaviorSubject(false)

  apps: any = []

  chartData: any = {}

  async ngOnInit() {
    this.apps = await this.fetchUserAppsServiceFunction()
    console.log("Apps" ,this.apps)
    var servicesIdList = []
    for (var i = 0; i < this.apps.length; i++) {
      // console.log(this.apps[i].services);
      servicesIdList[i] = this.apps[i].services;
    }

    var countOfHealthyServiceArray = []
    var countOfUnHealthyServiceArray = []

    for (var a of this.apps) {
      var HealthyCount = 0;
      var unHealthyCount = 0;
      console.log("Services", a.services)
      for (var v of a.services) {
        if (v.last_status == 'healthy')
          HealthyCount++;
      }

      var unHealthyCount = a.services.length - HealthyCount;
      console.log(HealthyCount, unHealthyCount)
      countOfHealthyServiceArray.push(HealthyCount)
      countOfUnHealthyServiceArray.push(unHealthyCount)
    }

    let names: any = this.apps.map((app: any) => {
      return app.name;
    });
  

    this.chartData = {
      labels: names,
      datasets: [
        { data: countOfHealthyServiceArray, label: 'healthy', backgroundColor: 'rgb(75, 192, 192)' },
        { data: countOfUnHealthyServiceArray, label: 'unhealthy', backgroundColor: 'rgb(255, 99, 132)' }
      ]
    }

  }


  fetchUserAppsServiceFunction() {
    // Start the Loader
    this.isLoading$.next(true);
    return new Promise((resolve, reject) => {
      let appService = this._Injector.get(AppService)
      appService.fetchUserApps()
        .then((res: any) => {
          resolve(res['apps'])
          //  Stop the loader
          //  this.isLoading$.next(false);
        })
        .catch((err) => {
          reject(err)
        })
    })
  }



  chartLabels = [
    'January',
    'February',
    'March',
    'April'
  ];

  chartOptions = {
    responsive: true
  }

  chartColors = [
    {
      borderColor: 'black',
      backgroundColor: '#4e73df',
    },
  ]

}
