import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentService } from '../../services/student-service';

@Component({
  selector: 'app-student-details',
  imports: [RouterLink],
  templateUrl: './student-details.html',
  styleUrl: './student-details.css',
})
export class StudentDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly studentService = inject(StudentService);

  student: any = null;
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('studentId');

    console.log('Student ID from route:', id);

    if (id) {
      this.loadStudent(id);
    } else {
      this.error = 'Invalid student ID';
    }
  }

  loadStudent(id: string) {
    this.loading = true;

    this.studentService.getStudentById(id).subscribe({
      next: (data) => {
        //console.log('Student Details:', data);
        this.student = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }
}
