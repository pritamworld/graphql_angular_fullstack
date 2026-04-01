import { Routes } from '@angular/router';
import { StudentList } from './pages/student-list/student-list';
import { StudentDetails } from './pages/student-details/student-details';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full'
  },
  {
    path: 'students',
    component: StudentList
  },
  {
    path: 'students-details/:studentId',
    component: StudentDetails
  }
];
