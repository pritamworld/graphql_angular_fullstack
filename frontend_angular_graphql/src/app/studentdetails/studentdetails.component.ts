import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { GET_STUDENT_BY_ID } from '../graphql/graphql.queries';

@Component({
  selector: 'app-studentdetails',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './studentdetails.component.html',
  styleUrl: './studentdetails.component.css'
})
export class StudentdetailsComponent {
  studentDetails: any = {}

  constructor(private route: ActivatedRoute, private apollo : Apollo) {
    // this.route.queryParams.subscribe(params => {
    //   const studentID = params['studentID'];
    //   console.log(`SID: ${this.studentID}`);
    // });

    this.route.params.subscribe(params => {
      console.log("params: " + JSON.stringify(params));
      const studentID = params['studentID'];
      console.log(`SID: ${studentID}`);
      this.getStudentById(studentID);
    })
  }

  ngOnInit(): void {
    console.log("--- ngOnInit() ---")
  }

  getStudentById(id: string) {
    console.log("getStudentById() id: " + id);
    this.apollo.query({
      query: GET_STUDENT_BY_ID,
      variables: {
        studentId: id
      }
    }).subscribe(({data, error}: any) => {
      console.log("StudentDetails: " + JSON.stringify(data));
      this.studentDetails = data.student;

    });
  }
}
