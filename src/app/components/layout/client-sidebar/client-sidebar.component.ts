import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-sidebar',
  templateUrl: './client-sidebar.component.html',
  styleUrls: ['./client-sidebar.component.css']
})
export class ClientSidebarComponent implements OnInit {
getImageAsBackgroundUrl(src: string): any {
  return `url('${src}')`;
}

  constructor() { }

  ngOnInit(): void {
  }

}
