import { Component } from '@angular/core';
import { ItemsListComponent } from './features/items/items-list/items-list.component';
@Component({
  selector: 'app-root',
  imports: [ItemsListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
