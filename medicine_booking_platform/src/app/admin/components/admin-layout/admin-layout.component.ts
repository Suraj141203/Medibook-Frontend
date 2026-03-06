import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  template: `
    <app-admin-navbar></app-admin-navbar>
    <div class="content-wrapper">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .content-wrapper {
      min-height: calc(100vh - 70px);
      background: #f8f9fa;
    }
  `]
})
export class AdminLayoutComponent {}