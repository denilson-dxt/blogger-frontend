import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleSideBar } from 'src/app/store/actions/configs.actions';
import { IAppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showMenu = false;
  constructor(private store:Store<IAppState>) { }

  ngOnInit(): void {
  }
  toggleNavbar(){
    this.store.dispatch(toggleSideBar());
  }

}
