import 'reflect-metadata';

import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

function validationFactory<T>(metadataKey: Symbol, model: { new (...args: any[]): T}, source: 'body' | 'params' | 'query')
{
    return function(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>): void
    {
        Reflect.defineMetadata(metadataKey, model, target, propertyName);

        const method = descriptor.value;
        descriptor.value = async function ()
        {
            const model = Reflect.getOwnMetadata(metadataKey, target, propertyName);

            const [request, response] = arguments;
            const plain               = request[source];

            const errors = await validate(plainToClass(model,  plain));
            if (errors.length > 0) {
                response.status(400).json(transformValidationErrorsToJSON(errors));
                return;
            }

            return method.apply(this, arguments);
        };
    };
}

function transformValidationErrorsToJSON(errors: ValidationError[])
{
    return errors.reduce((p, c: ValidationError) =>
    {
        if (!c.children || !c.children.length) {
            p[c.property] = Object.keys(c.constraints).map(key => c.constraints[key]);
        } else {
            p[c.property] = transformValidationErrorsToJSON(c.children);
        }

        return p;
    }, {});
}

export const ValidateQuery  = (dto: any) => validationFactory(Symbol('validate-query'), dto, 'query');
export const ValidateParams = (dto: any) => validationFactory(Symbol('validate-params'), dto, 'params');
export const ValidateBody   = (dto: any) => validationFactory(Symbol('validate-body'), dto, 'body');

export const Validate = { query: ValidateQuery, params: ValidateParams, body: ValidateBody };
