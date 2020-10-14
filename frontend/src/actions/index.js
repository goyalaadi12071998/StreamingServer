import axios from 'axios';
import history from '../History';

import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    EDIT_STREAM,
    DELETE_STREAM 
} from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: {
            userId: userId 
        }
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const createStream = (formValues) => {
    return async (dispatch,getState) => {
        const { userId } = getState().auth;
        const response = await axios.post('http://localhost:3001/streams',{...formValues,userId});
        //console.log(response);
        dispatch({
            type: CREATE_STREAM,
            payload: response.data
        });
        history.push('/');
    }
}

export const fetchStreams = () => {
    return async (dispatch) => {
        const response = await axios.get('http://localhost:3001/streams');
        //console.log(response);
        dispatch({
            type: FETCH_STREAMS,
            payload: response.data
        });
    }
}

export const fetchStream = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:3001/streams/${id}`);
        console.log('Fetch Stream',response);
        dispatch({
            type: FETCH_STREAM,
            payload: response.data
        });
    }
}

export const editStream = (id, formValues) => {
    return async (dispatch) => {
        const response = await axios.patch(`http://localhost:3001/streams/${id}`, formValues);
        console.log(response);
        dispatch({ 
            type: EDIT_STREAM,
            payload: response.data
        });
        history.push('/');
    }
}

export const deleteStream = (id) => {
    return async (dispatch) => {
        const response = await axios.delete(`http://localhost:3001/streams/${id}`);
        //console.log(response);
        dispatch({
            type: DELETE_STREAM,
            payload: id
        });
        history.push('/');
    }
}