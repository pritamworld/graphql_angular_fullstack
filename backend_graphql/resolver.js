const StudentModel = require('./models/Student');
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        students: async () => {
            return await StudentModel.find();
        },
        student: async (_, { id }) => {
            return await StudentModel.findById(id);
        }
    },
    Mutation: {
        createStudent: async (_, { firstname, lastname, email }) => {
            const student = new StudentModel({ firstname, lastname, email });
            await student.save();
            return student;
        },
        updateStudent: async (_, { id, firstname, lastname, email }) => {
            const student = await StudentModel.findByIdAndUpdate(id, { firstname, lastname, email }, { new: true });
            await student.save();
            return student;
        },
        deleteStudent: async (_, { id }) => {
            const student = await StudentModel.findByIdAndDelete(id);
            return student;
        }
    }
};
module.exports = resolvers;