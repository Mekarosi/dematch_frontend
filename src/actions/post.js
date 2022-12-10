import axios from 'axios'
import { setAlert } from './alert'
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES
} from '../actions/types'


// Get posts
export const getPosts = () => async dispatch => { 
    try {
        const res = await axios.get('https://dematch202.onrender.com/api/posts')

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({ 
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Add like
export const addLike = id => async dispatch => { 
    try {
        const res = await axios.put(`https://dematch202.onrender.com/api/posts/like/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (err) {
        dispatch({ 
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// Remove like
export const removeLike = id => async dispatch => { 
    try {
        const res = await axios.put(`https://dematch202.onrender.com/api/posts/unlike/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (err) {
        dispatch({ 
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}