import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/modules/shared/services/app.service';

@Component({
  selector: 'app-create-api-modal',
  templateUrl: './create-api-modal.component.html',
  styleUrls: ['./create-api-modal.component.scss']
})
export class CreateApiModalComponent implements OnInit {

  constructor(
    private _FormBuilder: FormBuilder,
    private _CreateApiComponentDialogRef: MatDialogRef<CreateApiModalComponent>,
  ) {

    // Initialise the form 
    this.form = this._FormBuilder.group({
      name: this.name,
      method: this.method,
      opco: this.opco,
      end_point: this.end_point,
      authorization_via_um: this.authorization_via_um
    })
  }

  // Form
  form: any

  // Alert
  titleAlert: string = 'This field is required'

  // Define Form Controls
  name = new FormControl(null, [Validators.required, Validators.nullValidator])
  method = new FormControl(null, [Validators.required, Validators.nullValidator])
  opco = new FormControl(null, [Validators.required, Validators.nullValidator])
  end_point = new FormControl(null, [Validators.required, Validators.nullValidator])
  authorization_via_um: any = new FormControl(null, [Validators.required, Validators.nullValidator])

  ngOnInit() {

  }

  createApi() {
    this._CreateApiComponentDialogRef.close({
      name: this.name.value,
      method: this.method,
      opco: this.opco,
      end_point: this.end_point.value,
      authorization_via_um: (this.authorization_via_um == 'Yes') ? true : false
    })
  }

  close() {
    this._CreateApiComponentDialogRef.close()
  }

}
