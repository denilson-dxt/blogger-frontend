import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup!:FormGroup;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this._initializeFormData();
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
      this.authService.login(this.loginFormGroup.value).subscribe(data=>{
        localStorage.setItem("authToken", data.token)
      });
      
  }
}
