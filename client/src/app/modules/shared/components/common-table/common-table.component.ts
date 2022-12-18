import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements OnInit {

  constructor(
    private _Injector: Injector,
    private _Route: ActivatedRoute,
    private _Router: Router,
  ) { }

  // Table Title
  @Input('title') title: any = ''

  appId = this._Route.snapshot.paramMap.get('appId')
  serviceId = this._Route.snapshot.paramMap.get('serviceId')
   // // Redirect URL
   // redirectURL: any

 // API ID
 apiId = this._Route.snapshot.paramMap.get('apiId')
 @Output('remove') removeAppEmitter = new EventEmitter<any>()


  // Datasource
  dataSource = new MatTableDataSource([])

  // Sort Table
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  // Paginator
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  // Is loading behaviour
  isLoading$ = new BehaviorSubject(false)

  // Columns list
  @Input('columns') displayedColumns: string[] = []

  // Table Data
  @Input('data') data: any = []

  // Row Data Emitter
  @Output('row') rowDataEmitter = new EventEmitter()

  ngOnInit(): void {

    // Start the Loader
    this.isLoading$.next(true)

    // Populate datasource
    this.populateDatasource(this.data)

    // Stop the Loader
    this.isLoading$.next(false)
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
  }

  populateDatasource(dataSet: any) {
    this.dataSource = new MatTableDataSource(dataSet)
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  trackByElement(index: number, element: any): number {
    return element.id
  }

  /**
   * This function is responsible for emitting the row data to the parent components
   * @param event 
   */
  emitRowEvent(event: any){
    this.rowDataEmitter.emit(event)
    // console.log(event)
  }

  checkCellDataType(cellData: any){
    if(cellData.includes('date'))
      return 'date'
    else if (cellData.includes('last_status'))
      return 'status'
    else if (cellData.includes('json') || cellData.includes('data') || cellData.includes('config') || cellData.includes('headers'))
      return 'json'
    else if(cellData.includes('delete'))
      return 'delete'
    else if(cellData.includes('view'))
      return 'view'
    else
    return 'default'
  }

  viewApi(event :any){
   console.log("Function Working!!" + event)
      this._Router.navigate(['/health-check', 'apps', this.appId, 'services', this.serviceId, 'api', event._id])
      // this.openApiDetailDialog(event)
    
  }

  removeApiFunction(appId: any) {
    return new Promise((resolve, reject) => {
      let api = this._Injector.get(AppService)
      api.removeApi(appId)
        .then((res: any) => {
          resolve(res['api'])
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  async removeApp(appId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will remove the api and all the related information about api",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1d4ed8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeApiFunction(appId)
          .then((api) => {
            console.log(api);
            Swal.fire(
              'Deleted!',
              'Your api has been removed from the system!',
              'success'
            ).then(() => {
              this.removeAppEmitter.emit(api)
           
              // this._Router.navigate(['/health-check' , 'apps' , this.appId , 'services' , this.serviceId ])
            })
          })
      }
    })
  }

}
