import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable, catchError, throwError } from 'rxjs';

import {
  GET_HELLO,
  GET_STUDENT_BY_ID,
  GET_STUDENTS,
  UPDATE_STUDENT,
  DELETE_STUDENT,
  ADD_STUDENT,
} from '../graphql/graphql.queries';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private readonly apollo = inject(Apollo);

  // Centralized Error Handler
  private handleError(error: any) {
    console.error('GraphQL Error:', error);

    let errorMessage = 'Something went wrong. Please try again.';

    if (error?.graphQLErrors?.length) {
      errorMessage = error.graphQLErrors.map((e: any) => e.message).join(', ');
    } else if (error?.networkError) {
      errorMessage = 'Network error. Check your connection.';
    }

    return throwError(() => new Error(errorMessage));
  }

  // Hello
  getHello(): Observable<string> {
    return this.apollo
      .query<any>({ query: GET_HELLO })
      .pipe(
        map((res) => res?.data?.hello),
        catchError((error) => this.handleError(error))
      );
  }

  // Get all students
  getStudents(): Observable<any[]> {
    return this.apollo
      .watchQuery<any>({ query: GET_STUDENTS })
      .valueChanges.pipe(
        map((res) => {
          console.log('Fetched Students:', res);
          return res?.data?.students || [];
        }),
        catchError((error) => this.handleError(error))
      );
  }

  // Get by Student By ID
  getStudentById(id: string): Observable<any> {
    return this.apollo
      .query<any>({
        query: GET_STUDENT_BY_ID,
        variables: { studentId: id },
      })
      .pipe(
        map((res) => {
          //console.log('Fetched Student:', res.data.student);
          return res.data.student;
        }),
        catchError((error) => this.handleError(error))
      );
  }

  // Add New Student
  addStudent(student: any): Observable<any> {
    return this.apollo
      .mutate({
        mutation: ADD_STUDENT,
        variables: {
          firstname: student.firstname,
          lastname: student.lastname,
          email: student.email,
        },
        refetchQueries: [{ query: GET_STUDENTS }],
      })
      .pipe(
        map((res: any) => res.data.addStudent),
        catchError((error) => this.handleError(error))
      );
  }

  // Update Student
  updateStudent(id: string, student: any): Observable<any> {
    return this.apollo
      .mutate({
        mutation: UPDATE_STUDENT,
        variables: {
          updateStudentId: id,
          firstname: student.firstname,
          lastname: student.lastname,
          email: student.email,
        },
        refetchQueries: [{ query: GET_STUDENTS }],
      })
      .pipe(
        map((res: any) => res.data.updateStudent),
        catchError((error) => this.handleError(error))
      );
  }

  // Delete Student
  deleteStudent(id: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: DELETE_STUDENT,
        variables: { deleteStudentId: id },
        refetchQueries: [{ query: GET_STUDENTS }],
      })
      .pipe(
        map((res: any) => res.data.deleteStudent),
        catchError((error) => this.handleError(error))
      );
  }
}
