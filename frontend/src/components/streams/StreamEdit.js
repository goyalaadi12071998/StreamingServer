import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editStream, fetchStream } from '../../actions/index';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends Component {
    
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        // console.log('formValues', formValues);
        this.props.editStream(this.props.match.params.id,formValues);
        formValues.title = "";
        formValues.description = "";
    }

    render() { 
        // console.log('Props',this.props);
        return ( 
            <div> 
                <h1>Edit Stream {this.props.match.params.id}</h1>
                <StreamForm 
                    initialValues={_.pick(this.props.stream, 'title', 'description')} 
                    onSubmit={this.onSubmit} />
            </div>
        );
    }
}

const mapStateToProps = (state,ownProps) => {
    console.log(state.streams[ownProps.match.params.id]);
    return {stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps,{ editStream, fetchStream })(StreamEdit);