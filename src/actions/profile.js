import axios from 'axios'
import { setAlert } from './alert'



import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_REPOS
} from './types'

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
       const res = await axios.get('https://dematch202.onrender.com/api/profile/me')
   
       dispatch({
        type: GET_PROFILE,
        payload: res.data
       })
   
    } catch (err){
        dispatch({ 
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}

// Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    try {
       const res = await axios.get('https://dematch202.onrender.com/api/profile')
   
       dispatch({
        type: GET_PROFILES,
        payload: res.data
       })
   
    } catch (err){
        dispatch({ 
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}


// Get profile by ID
export const getProfileById = userId => async dispatch => {
    try {
       const res = await axios.get(`https://dematch202.onrender.com/api/profile/user/${userId}`)
   
       dispatch({
        type: GET_PROFILE,
        payload: res.data
       })
   
    } catch (err){
        dispatch({ 
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}

// Get all Github repos
export const getGithubRepos = username => async dispatch => {
    
    try {
       const res = await axios.get(`https://dematch202.onrender.com/api/profile/github/${username}`)
   
       dispatch({
        type: GET_REPOS,
        payload: res.data
       })
   
    } catch (err){
        dispatch({ 
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}

// Create or update profile
export const createProfile = (formData, navigate, edit = false) => async dispatch => {
    
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

       const res = await axios.post('https://dematch202.onrender.com/api/profile', formData, config)  
     
       dispatch({
        type: GET_PROFILE,
        payload: res.data
       })

       dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created'))
    if(!edit) {
        navigate('/dashboard')
      
    }
    } catch (err) { 
        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({ 
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Add Experience
export const addExperience = (formData, navigate) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

       const res = await axios.put('https://dematch202.onrender.com/api/profile/experience', formData, config)  
     
       dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
       })

       dispatch(setAlert('Experience Added', 'success'))
        navigate('/dashboard')
      
    } catch (err) { 
        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({ 
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Add Education
export const addEducation = (formData, navigate) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

       const res = await axios.put('https://dematch202.onrender.com/api/profile/education', formData, config)  
     
       dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
       })

       dispatch(setAlert('Education Added', 'success'))
        navigate('/dashboard')
      
    } catch (err) { 
        const errors = err.response.data?.errors

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({ 
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete experience
export const deleteExperience = id => async dispatch => {
    try {
       const res = await axios.delete(`https://dematch202.onrender.com/api/profile/expereience/${id}`)
   
       dispatch({
          type: UPDATE_PROFILE,
          payload: res.data
       })

       dispatch(setAlert('Experience Removed', 'success'))
   
    } catch (err) {
        dispatch({ 
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// Delete education
export const deleteEducation = id => async dispatch => {
    try {
       const res = await axios.delete(`https://dematch202.onrender.com/api/profile/education/${id}`)
   
       dispatch({
          type: UPDATE_PROFILE,
          payload: res.data
       })

       dispatch(setAlert('Education Removed', 'success'))
   
    } catch (err) {
        dispatch({ 
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete account & profile
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone!')){
        try {
         await axios.delete(`https://dematch202.onrender.com/api/profile`)
        
            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: ACCOUNT_DELETED })
     
            dispatch(setAlert('Your account has been permanently deleted', 'danger'))
        
         } catch (err) {
             dispatch({ 
                 type: PROFILE_ERROR,
                 payload: { msg: err.response.statusText, status: err.response.status }
             })
         }
     }
     
    }
    