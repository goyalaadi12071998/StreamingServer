import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions/index';
import StreamForm from './StreamForm';

class StreamCreate extends Component {
    
    onSubmit = (formValues) => {
        this.props.createStream(formValues);
        formValues.title = "";
        formValues.description = "";
    }

    render() { 
        return ( 
            <div> 
                <h1>Create Stream</h1>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}


export default connect(null,{ createStream })(StreamCreate);