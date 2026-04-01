import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../services/student-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-list',
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {
  title = 'Student List';
  hello: string = '';
  students: any[] = [];
  error: any;

  isEditMode = false;
  selectedStudentId: string | null = null;

  private readonly studentService = inject(StudentService);

  studentForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  ngOnInit() {
    this.studentService.getHello().subscribe({
      next: (data) => {
        this.hello = data;
      },
      error: (err) => {
        this.error = err;
      },
    });

    this.loadStudents();
  }

  onSubmit() {
    if (this.studentForm.invalid) return;

    if (this.isEditMode) {
      this.updateStudent();
    } else {
      this.addStudent();
    }
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => {
        this.error = err;
      },
    });
  }

  addStudent() {
    const student = this.studentForm.value;

    // call API
    this.studentService.addStudent(student).subscribe(() => {
      this.loadStudents();
      this.resetForm();
    });
  }

  selectStudent(student: any) {
    this.isEditMode = true;
    this.selectedStudentId = student._id;

    this.studentForm.patchValue({
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
    });
  }

  updateStudent() {
    if (!this.selectedStudentId) return;

    this.studentService
      .updateStudent(this.selectedStudentId, this.studentForm.value)
      .subscribe(() => {
        this.loadStudents();
        this.resetForm();
      });
  }

  deleteStudent(id: string) {
    if (!confirm('Are you sure you want to delete?')) return;

    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }

  resetForm() {
    this.studentForm.reset();
    this.isEditMode = false;
    this.selectedStudentId = null;
  }
}
