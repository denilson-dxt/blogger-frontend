import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this._initializeForm();
  }

  private _initializeForm(){
    this.registerForm = new FormGroup({
      email:new FormControl("", [Validators.required, Validators.email]),
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      file:new FormControl(""),
      profilePicture: new FormControl("")

    })
  }

  onFileChange(event:any){
      if(event.target.files.length > 0){
        const file = event.target.files[0];
        this.registerForm.patchValue({
          profilePicture: file
        })
      }
  }
  submit(){
    if(this.registerForm.invalid) return;
    const formData = new FormData();
    formData.append("email", this.registerForm.get("email")?.value);
    formData.append("userName", this.registerForm.get("userName")?.value);
    formData.append("password", this.registerForm.get("password")?.value);
    formData.append("profilePicture", this.registerForm.get("profilePicture")?.value);
    console.log(this.registerForm.value);
    
    this.authService.register(formData).subscribe(data =>{
      console.log(data);
      this.router.navigate(["/auth/login"])
    });
  }

}
