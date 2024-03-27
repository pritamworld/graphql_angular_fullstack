const { gql } = require('apollo-server-express');
const typeDefs = gql`
    type Student {
        _id: ID!
        firstname: String!
        lastname: String!
        email: String!
    }

    type Query {
        hello: String
        students: [Student]
        student(id: ID!): Student
    }
    type Mutation {
        createStudent(firstname: String!, lastname: String!, email: String!): Student
        updateStudent(id: ID!, firstname: String!, lastname: String!, email: String!): Student
        deleteStudent(id: ID!): Student
    }

    input StudentInput {
        firstname: String!
        lastname: String!
        email: String!
    }
`;
module.exports = typeDefs;