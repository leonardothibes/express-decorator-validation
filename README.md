express-decorator-validation
============================

Decorator based validation to use in [Express](https://expressjs.com) routes.

Getting started
---------------

Install the dependency.
```bash
npm install express-decorator-validation --save
```

#### Up the Express server and definig routes:
```typescript
import { Validator } from 'express-decorator-validation';
import { PaginationRequestModel, CreateStudentModel } from './models';

import * as express from 'express';
import * as cors from 'cors';

const app = express();
app.use([express.json(), cors()]);

class StudentController 
{
    @Validator.query(PaginationRequestModel) // Model described below...
    public getStudents(request, response)
    {
        // You CAN TRUST in this request input now.
        const {page, page_size, search} = request.query;

        response.json({
            page, 
            page_size, 
            total: 1, 
            items: [
                {
                    name         : 'Peter',
                    last_name    : 'Parker',
                    date_of_birth: '1990-04-23',
                }
            ]
        });
    }

    @Validator.body(CreateStudentModel)  // Model described below...
    public createStudent(request, response)
    {
        // You CAN TRUST in this request input now.
        const { name, last_name, date_of_birth } = request.body;

        response.json({name, last_name, date_of_birth});
    }
}

app.get('/students', StudentController.getStudents);
app.post('/students', StudentController.createStudent);

app.listen(3000, () => console.log(`app is listening`));
```

#### Defining models:
```typescript
import {
    IsInt,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    Matches,
    Max,
    Min,
    MinLength,
    ValidateNested 
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreditCardModel 
{
    @IsString()
    @MinLength(4)
    brand: string;

    @IsString()
    @MinLength(10)
    token: string;
}

export class CreateStudentModel 
{
    @MinLength(3)
    @IsString()
    name: string;

    @MinLength(3)
    @IsString()
    last_name: string;

    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date of birth must mach with the format: YYYY-MM-DD' })
    date_of_birth?: string;

    @IsObject()
    @Type(() => CreditCardModel)
    @ValidateNested()
    creditcard: CreditCardModel;
}

export class PaginationRequestModel 
{
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page: number;

    @Min(5)
    @Max(50)
    @Type(() => Number)
    page_size: number;

    @IsOptional()
    search?: string;
}
```

MIT License
-----------

Copyright (c) 2023 Leonardo Thibes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
