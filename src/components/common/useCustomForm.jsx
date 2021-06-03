import React, { useState } from 'react'
import Joi from 'joi-browser'
import FormInput from './formInput'
import FormSelect from './formSelect'
import { Button } from '@material-ui/core';

const UseCustomForm = (vals, schema, mapToViewModel) => {
    const [values, setValues] = useState(vals);
    const [errors, setErrors] = useState([]);

    const customMapToViewModel = (item) => {
        const data = mapToViewModel(item);
        setValues(data);
    }

    const handleSubmit = (e, doSubmit) => {
        e.preventDefault();
        setErrors(validate(values));
        if (errors) {
            return;
        }
        doSubmit(values);
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

    const selectHandler = ({ target: input }, path) => {
        const errorMessage = validateProperty(input);
        const newErrorObj = { ...errors };

        if (errorMessage) newErrorObj[input.name] = errorMessage;
        else delete newErrorObj[input.name];
        setErrors(newErrorObj);

        const newValueObj = { ...values };
        newValueObj[path] = input.value;
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

    const renderSelect = (items = {}, id = '', labelId = '', label = '', path = '') => {
        return (
            <FormSelect
                id={id}
                label={label}
                items={items}
                labelId={labelId}
                selectedId={values[path]}
                onChange={(e) => selectHandler(e, path)}
                required
                size={12} />

        )
    }

    const renderButton = (label) => {
        return (
            <Button variant="contained" color="primary" type="submit" disabled={!!validate()}>{label}</Button>
        )

    }

    return { handleSubmit, validate, changeHandler, renderInput, renderButton, renderSelect, customMapToViewModel, setErrors, values, errors }
}
export default UseCustomForm;
