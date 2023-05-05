import * as express from 'express';
import { Validate, ValidateQuery, ValidateBody } from '../src/validation.decorator';

// import { PaginationRequestModel, CreateStudentModel } from './student.model';
import { PaginationRequestModel } from './student.model';

const app = express();
app.use(express.json());

class StudentController
{
    @Validate.query(PaginationRequestModel)
    static getStudents(request, response)
    {
        const {page, page_size, search} = request.query;
        response.json({page, page_size, total: 1, items: [{name: 'Peter', last_name: 'Parker', date_of_birth: '1990-04-23'}]});
    }

    // @ValidateBody(CreateStudentModel)
    // static createStudent(request, response)
    // {
    //     const {name, last_name, date_of_birth} = request.body;
    //     response.json({name, last_name, date_of_birth});
    // }
}

app.get('/students', StudentController.getStudents);
// app.post('/students', StudentController.createStudent);

app.listen(3000, () => console.log(`app is listening`));
