import { Component, Injector, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/modules/shared/services/auth.service'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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

  // Is loading behaviour
  isLoading$ = new BehaviorSubject(false)

  ngOnInit() {

    // Initialise the form 
    this.form = this._FormBuilder.group({
      email: [null, [Validators.required]],
      password: [null, Validators.required]
    })
  }

  /**
   * Base Login Function Call
   */
  async login() {

    // Start the Loader
    this.isLoading$.next(true)

    if (!this.form.valid) {
      console.log('Invalid Form!')

      // Stop the Loader
      this.isLoading$.next(false)

    } else {

      // Call the Login Service Function
      await this.loginServiceFunction(this.form.value)
        .then((res: any) => {

          // Set the token and current user data
          localStorage.setItem('token', JSON.stringify(res['token']))
          localStorage.setItem('user', JSON.stringify(res['user']))

          // Stop the Loader
          this.isLoading$.next(false)

          // Redirect User
          this.redirectUser()
        })
        .catch((error) => {

          // Console the Errors
          console.log('Error', error)

          // Stop the Loader
          this.isLoading$.next(false)
        })
    }
  }

  /**
   * This function is responsible for calling in the sign-in API
   * @param userData 
   * @returns 
   */
  loginServiceFunction(userData: any) {
    return new Promise((resolve, reject) => {
      let authService = this._Injector.get(AuthService)
      authService.signIn(userData)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  /**
   * This function is responsible for redirecting the user to the desired endpoint in the application
   */
  redirectUser() {
    let params = this._Route.snapshot.queryParams
    if (params['redirectURL']) {
      this.redirectURL = params['redirectURL']
    }
    if (this.redirectURL) {
      this._Router.navigateByUrl(this.redirectURL)
        .catch(() => this._Router.navigate(['/dashboard/home']))
    } else {
      this._Router.navigate(['/dashboard/home'])
    }
  }

}
