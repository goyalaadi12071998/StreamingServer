import React, { Component } from 'react';
import { fetchStream } from '../../actions/index';
import { connect } from 'react-redux';
import flv from 'flv.js';

class ShowStream extends Component {
    
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
        // console.log('Video Ref',this.videoRef)
        // this.player = flv.createPlayer({
        //     type: 'flv',
        //     url: `http://localhost:8000/live/${this.props.match.params.id}.flv`
        // });
        // this.player.attachMediaElement(this.videoRef.current);
        // this.player.load();
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
        console.log('Player destroyed');
    }

    buildPlayer() {
        if(this.player || !this.props.stream) {
            return;
        }
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${this.props.match.params.id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() { 
        if(!this.props.stream) return <h1>Loading</h1>;
        return (
            <div>
                <h2>{this.props.stream.title}</h2>
                <video ref={this.videoRef} style={{width: '100%', height: '60%'}} controls={true} />  
                <h4>{this.props.stream.description}</h4>
            </div>            
        );
    }
}
 
const mapStateToProps = (state,ownProps) => {
    console.log('State',state);
    return {stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps,{fetchStream})(ShowStream);
