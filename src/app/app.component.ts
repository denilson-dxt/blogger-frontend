import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GET_ME } from './store/actions/auth.actions';
import { IAppState } from './store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blogger';
  constructor(private router:Router, private store:Store<IAppState>){}

  isAdminRoute():boolean{    
    return this.router.url.startsWith("/admin")
  }
  ngOnInit(){
    this.store.dispatch(GET_ME())
  }
}
