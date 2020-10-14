import React from 'react';
import Modal from '../Modal';
import history from '../../History';
import { deleteStream } from '../../actions/index';
import { connect } from 'react-redux';

class StreamDelete extends React.Component {

    actions = () => {
        return (
            <React.Fragment>
                <button 
                    onClick={() => this.props.deleteStream(this.props.match.params.id)} 
                    className="ui button red">Delete
                </button>
                <button 
                    onClick={() => history.push('/')}
                    className="ui button">Cancel
                </button>
            </React.Fragment>
        );
    };
    

    render() {
        return (  
            <Modal 
                title="Delete Stream"
                content="Are you sure you want to delete this stream?"
                actions={this.actions()}
                onDismiss={() => history.push('/')}
            />
        );
    }
}

export default connect(null,{deleteStream})(StreamDelete);