import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blogger';
  constructor(private router:Router){}

  isAdminRoute():boolean{
    console.log(this.router.url);
    
    return this.router.url.startsWith("/admin")
  }
}
