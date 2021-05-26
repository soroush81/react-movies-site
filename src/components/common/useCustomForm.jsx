import React, { useState } from 'react'
import Joi from 'joi-browser'
import FormInput from './formInput'
import { SubscriptionsOutlined } from '@material-ui/icons';


const UseCustomForm = (vals, schema) => {
    const [values, setValues] = useState(vals);
    const [errors, setErrors] = useState({});

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));
        // console.log(errors)
        if (errors) return;
    };

    const validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(values, schema, options)
        if (!error) return;
        const errs = {}
        for (let err of error.details) {
            errs[err.path[0]] = err.message;
        }
        return errs;
    }

    const validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const newSchema = { [name]: schema[name] };
        const { error } = Joi.validate(obj, newSchema);
        if (!error)
            return null;
        return error.details[0].message;
    }


    const changeHandler = ({ target: input }) => {
        const errorMessage = validateProperty(input);
        const newErrorObj = { ...errors };
        if (errorMessage) newErrorObj[input.name] = errorMessage;
        else delete newErrorObj[input.name];

        setErrors(newErrorObj);
        const newValueObj = { ...values };
        newValueObj[input.name] = input.value;
        setValues(newValueObj);
    }

    const renderInput = (name, label, type = 'text', autoFocus = false) => {
        return (
            <FormInput
                name={name}
                label={label}
                value={values[name]}
                onChange={changeHandler}
                required
                size={12}
                autoFocus={autoFocus}
                type={type}
                error={errors && errors[name]} />
        )
    }

    return { handleSubmit, validate, changeHandler, renderInput, values, errors }
}
export default UseCustomForm;
