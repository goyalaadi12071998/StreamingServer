import React , { Component } from 'react';
import { fetchStreams } from '../../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class StreamList extends Component {

    componentDidMount() {
        this.props.fetchStreams();
    }
    
    renderEditDeleteButtons = (stream) => {
        if(this.props.currentUserId === stream.userId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`}>
                        <button className="ui button primary">Edit</button>
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`}>
                        <button className="ui button red">Delete</button>
                    </Link>
                </div>
            )
        }
        return null;
    }

    renderCreateStreamButton() {
        if(this.props.isSignedIn) {
            return (
                <div className="right floated content" style={{textAlign: 'right'}}>
                    <Link to="/streams/new">
                        <button className="ui button black">Create New Stream</button>
                    </Link>
                </div>
            );
        }
    }

    renderList() {
        //console.log(this.props.streams);
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderEditDeleteButtons(stream)}
                    <i className="large github middle aligned icon"/>
                    <div className="content">
                        <Link to={`/streams/show/${stream.id}`}>
                            <strong>{stream.title}</strong>
                        </Link>
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() { 
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreateStreamButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        streams: Object.values(state.streams), 
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps,{fetchStreams})(StreamList);