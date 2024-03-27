import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { GET_HELLO, GET_STUDENTS, GET_STUDENT_BY_ID, ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT } from './graphql/graphql.queries';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GraphQL Client';

  students: any[] = [];
  error: any;
  hello: string = '';

  studentForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private apollo : Apollo){
    console.log("--- GQL Component() ---")
  }

  ngOnInit(): void {
    console.log("--- ngOnInit() ---")
    this.getHello();
    this.getStudents();
  }

  getHello() {
    console.log("getHello()");
    this.apollo.query({
      query: GET_HELLO
    }).subscribe((result) => {
      console.log(result);
      //this.hello = result.data['hello'];
      console.log(this.hello);
    });
  }

  getStudentById(id: string) {
    console.log("getStudentById() id: " + id);
    this.apollo.query({
      query: GET_STUDENT_BY_ID,
      variables: {
        studentId: id
      }
    }).subscribe(({data, error}: any) => {
      this.studentForm.setValue({
        firstname: data.student.firstname,
        lastname: data.student.lastname,
        email: data.student.email
      });
      this.error = error;
    });
  }

  getStudents() {
    console.log("getStudents()");
    this.apollo.watchQuery({
      query: GET_STUDENTS
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.students = data.students;
      this.error = error;
      console.log(this.students);
  });
}

  addStudent() {
    console.log("addStudent()");
    this.apollo.mutate({
      mutation: ADD_STUDENT,
      variables: {
        firstname: this.studentForm.value.firstname,
        lastname: this.studentForm.value.lastname,
        email: this.studentForm.value.email
      },
      refetchQueries: [{
        query: GET_STUDENTS
      }]
    }).subscribe(({data}: any) => {
      this.students = data.students;
      this.studentForm.reset();
    }, (error) => {
      this.error = error;
    });
  }

  updateStudent(id: string) {
    console.log("updateStudent() id: " + id);
    this.apollo.mutate({
      mutation: UPDATE_STUDENT,
      variables: {
        updateStudentId: id,
        firstname: this.studentForm.value.firstname,
        lastname: this.studentForm.value.lastname,
        email: this.studentForm.value.email,
      },
      refetchQueries: [{
        query: GET_STUDENTS
      }]
    }).subscribe(({data}: any) => {
      this.students = data.students;
      this.studentForm.reset();
    }, (error) => {
      this.error = error;
    });
  }

  deleteStudent(id: string) {
    // apollo graphql query to delete todo
    console.log("deleteStudent() id: " + id);
    this.apollo.mutate({
      mutation: DELETE_STUDENT,
      variables: {
        deleteStudentId: id,
      },
      refetchQueries: [{
        query: GET_STUDENTS
      }]
    }).subscribe(({data}: any) => {
      this.students = data.students;
    }, (error) => {
      this.error = error;
    });
  }

}
