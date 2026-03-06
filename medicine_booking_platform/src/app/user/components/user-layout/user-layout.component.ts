import { Component } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  template: `
    <app-user-navbar></app-user-navbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class UserLayoutComponent { }