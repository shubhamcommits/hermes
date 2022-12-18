import { Component, Injector, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { emailRegex } from 'src/app/modules/shared/configs/email-regex'
import { AuthService } from 'src/app/modules/shared/services/auth.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private _FormBuilder: FormBuilder,
    private _Injector: Injector,
    private _Router: Router,
    private _Route: ActivatedRoute
  ) { }

  // Form
  form: any

  // Redirect URL
  redirectURL: any

  ngOnInit() {

    // Initialise the form 
    this.form = this._FormBuilder.group({
      first_name: [null, [Validators.required]],
      last_name: [null, Validators.required],
      auuid: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(emailRegex)]],
      password: [null, Validators.required],
      c_password: [null, Validators.required]
    })
  }

  async signUp() {
    if (!this.form.valid) {
      console.log('Invalid Form!')
    } else {
      await this.signUpServiceFunction(this.form.value)
        .then((res: any) => {
          this._Router.navigate(['/home/confirm'])
        })
        .catch((error)=>{
          console.log('Error', error)
        })
    }
  }

  signUpServiceFunction(userData: any) {
    return new Promise((resolve, reject) => {
      let authService = this._Injector.get(AuthService)
      authService.signUp(userData)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err) => {
          reject({})
        })
    })
  }

}
