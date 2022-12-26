import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LOGOUT } from 'src/app/store/actions/auth.actions';
import { toggleSideBar } from 'src/app/store/actions/configs.actions';
import { IAppState } from 'src/app/store/reducers';
import { SELECT_IS_AUTHENTICATED } from 'src/app/store/selectors/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showMenu = false;
  isAuthenticated:boolean = false;
  constructor(private store:Store<IAppState>) { }

  ngOnInit(): void {
    this.store.pipe(select(SELECT_IS_AUTHENTICATED)).subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    })
  }
  toggleNavbar(){
    this.store.dispatch(toggleSideBar());
  }

  logout():void{
    this.store.dispatch(LOGOUT())
  }

}
