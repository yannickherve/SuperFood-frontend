import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidenav-left',
  templateUrl: './sidenav-left.component.html',
  styleUrls: ['./sidenav-left.component.scss']
})
export class SidenavLeftComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.closeSidenav.emit();
  }

  onLogout(): void {
    this.closeSidenav.emit();
  }

}
