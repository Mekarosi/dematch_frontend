import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import PrivateRoute from './components/routing/PrivateRoute'

//Redux
import { Provider } from 'react-redux'
import store from './store'
import setAuthToken  from './utils/setAuthToken'
import { loadUser } from './actions/auth'


import './App.css';

if(localStorage.token) {
  setAuthToken(localStorage.token)
 } 

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
     <Router>
      <Fragment>
        <Navbar />
       
        <section className='container'>
          <Alert />
          <Routes>
          <Route exact path="/" element={<Landing/>} />
            <Route exact path="register" element={<Register />} />
            <Route exact path="login" element={<Login/>} />
            <Route exact path="profiles" element={<Profiles/>} />
            <Route exact path="profile/:id" element={<Profile/>} />

            <Route exact path="dashboard" element={<PrivateRoute/>} >
              <Route exact path='/dashboard' element={<Dashboard/>}/>
            </Route>

            <Route exact path="create-profile" element={<PrivateRoute/>} >
              <Route exact path='/create-profile' element={<CreateProfile/>}/>
            </Route>

            <Route exact path="edit-profile" element={<PrivateRoute/>} >
              <Route exact path='/edit-profile' element={<EditProfile/>}/>
            </Route>

            <Route exact path="add-experience" element={<PrivateRoute/>} >
              <Route exact path='/add-experience' element={<AddExperience/>}/>
            </Route>

            <Route exact path="add-education" element={<PrivateRoute/>} >
              <Route exact path='/add-education' element={<AddEducation/>}/>
            </Route>

            <Route exact path="posts" element={<PrivateRoute/>} >
              <Route exact path='/posts' element={<Posts/>}/>
            </Route>

            <Route exact path="posts/:id" element={<PrivateRoute/>} >
              <Route exact path='/posts/:id' element={<Post/>}/>
            </Route>

          </Routes>
        </section>
      </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
