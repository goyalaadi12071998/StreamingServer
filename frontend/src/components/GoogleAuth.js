import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions/index';

class GoogleAuth extends Component {

    componentDidMount() {
        // console.log('On first calling component',this.props);
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: process.ENV.GOOGLE_AUTH_PUBLIC_KEY,
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                // console.log('getting value1');
                this.onAuthChange(this.auth.isSignedIn.get());
                // console.log('getting value1');
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    onAuthChange = isSignedIn => {
        // console.log('authchange called');
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        }else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        // console.log('signin called');
        this.auth.signIn();
    }

    onSignOutClick = () => {
        // console.log('signout called');
        this.auth.signOut();
    }

    renderAuthButton() {
        // console.log('renderedbutton called');
        if(this.props.isSignedIn === null){
            return null;
        }
        else if(this.props.isSignedIn){
            return (
                <button onClick={this.onSignOutClick} className="ui google black button">
                    <i className="google icon" />
                    Sign out
                </button>
            );
        }
        else{
            return (
                <button onClick={this.onSignInClick} className="ui google red button">
                    <i className="google icon" />
                    Sign In
                </button>
            );
        }
    }

    render() {
        // console.log('component rendered');
        return (  
            <h1>{this.renderAuthButton()}</h1>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log('coming to mapstatefunction');
    return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
}

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);
