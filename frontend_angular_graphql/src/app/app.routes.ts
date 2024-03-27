import { Routes } from '@angular/router';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';

export const routes: Routes = [
  { path: 'studentdetails/:studentID', component: StudentdetailsComponent}
];
