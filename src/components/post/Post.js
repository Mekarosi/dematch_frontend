import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import { getPost } from '../../actions/post'
import CommentForm from './CommentForm'
import { Link, useParams } from 'react-router-dom'

const Post = ({ getPost, post:{ post, loading } }) => {
 
    const id = useParams()
 
    useEffect(() => {
    getPost(id)
 }, [getPost])
 
 
    return loading || post === null ? (
    <Spinner /> 
    ) : (
    <Fragment>
        <Link to='/post' className='btn'>
            Back To Posts
        </Link>
        <PostItem  post={post}  showActions={false}/>
        <CommentForm postId={post._id} />
    </Fragment>)
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)