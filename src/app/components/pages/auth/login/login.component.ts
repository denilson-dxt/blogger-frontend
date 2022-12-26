import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { LOGIN } from 'src/app/store/actions/auth.actions';
import { IAppState } from 'src/app/store/reducers';
import { SELECT_LOGIN_ERRORS } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup!:FormGroup;
  loginError?:string = "";
  constructor(private authService:AuthService, private store:Store<IAppState>) { }

  ngOnInit(): void {
    this._initializeFormData();
    this.store.pipe(select(SELECT_LOGIN_ERRORS)).subscribe(error => {
      this.loginError = error;
    })
  }

  private _initializeFormData(){
    this.loginFormGroup = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    });
  }

  submit():void{
    if(this.loginFormGroup.invalid) return;
    
    console.log(this.loginFormGroup.value);
      this.store.dispatch(LOGIN(this.loginFormGroup.value));
      
  }
}
