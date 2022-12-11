import axios from 'axios'
import { setAlert } from './alert'
import {
    DELETE_POST,
    ADD_POST,
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

// Delete post
export const deletePost = id => async dispatch => { 
    try {
         await axios.delete(`https://dematch202.onrender.com/api/posts/${id}`)

        dispatch({
            type: DELETE_POST,
            payload: id
        })

        dispatch(setAlert('Post Removed', 'success'))
    } catch (err) {
        dispatch({ 
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Add post
export const addPost = formData => async dispatch => { 
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    try {
        const res = await axios.post('https://dematch202.onrender.com/api/posts', formData, config)

        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        dispatch(setAlert('Post Created', 'success'))
    } catch (err) {
        dispatch({ 
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}