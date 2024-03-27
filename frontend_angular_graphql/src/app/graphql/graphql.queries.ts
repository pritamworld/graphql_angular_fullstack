import {gql} from 'apollo-angular'

const GET_HELLO = gql`
  query HelloWord {
    hello
  }
`

const GET_STUDENTS = gql`
  query Students {
      students {
        _id
        firstname
        lastname
        email
      }
    }
`
const GET_STUDENT_BY_ID = gql`
query Student($studentId: ID!) {
    student(id: $studentId) {
      _id
      firstname
      lastname
      email
    }
  }
`
const ADD_STUDENT = gql`
  mutation CreateStudent($firstname: String!, $lastname: String!, $email: String!) {
    createStudent(firstname: $firstname, lastname: $lastname, email: $email) {
      _id
      firstname
      lastname
      email
    }
  }
`
const UPDATE_STUDENT = gql`
  mutation UpdateStudent($updateStudentId: ID!, $firstname: String!, $lastname: String!, $email: String!) {
    updateStudent(id: $updateStudentId, firstname: $firstname, lastname: $lastname, email: $email) {
      _id
      firstname
      lastname
      email
    }
  }
`
const DELETE_STUDENT = gql`
  mutation DeleteStudent($deleteStudentId: ID!) {
    deleteStudent(id: $deleteStudentId) {
      _id
      firstname
      lastname
      email
    }
  }
`

export { GET_HELLO, GET_STUDENTS, GET_STUDENT_BY_ID, ADD_STUDENT, UPDATE_STUDENT, DELETE_STUDENT }
