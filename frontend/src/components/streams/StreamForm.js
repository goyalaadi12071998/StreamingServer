import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
    
    renderError(meta) {
        if(meta.touched) {
            return <p style={{ color: 'red'}}><strong>{meta.error}</strong></p>
        }
        return null;
    }

    renderInput = (formProps) => {
        const meta = formProps.meta;
        return (
            <div className="field">
                <label>{formProps.label}</label>
                {this.renderError(meta)}
                <input {...formProps.input} autoComplete="off" />
            </div>
        );
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
        formValues.title = "";
        formValues.description = "";
    }

    render() { 
        return ( 
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
                <Field 
                    name="title" 
                    component={this.renderInput} 
                    label="Enter Title" 
                />
                <Field 
                    name="description" 
                    component={this.renderInput} 
                    label="Enter Description" 
                />
                <button className="ui button black">Submit Form</button>
            </form>
        );
    }
}
 
const validate = (formValues) => {

    const errors = {};

    if(!formValues.title) {
        errors.title = 'You must provide a title';
    }
    if(!formValues.description) {
        errors.description = 'You must provide a description';
    }

    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);
