import { ADD_POST, EDIT_POST, DELETE_POST, ADD_COMMENT, DELETE_COMMENT, LOAD_TITLES, LOAD_POST, SHOW_SPINNER, SHOW_ERR, UPDATE_VOTE } from "./actionTypes";
import uuid from "uuid/v4";
import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
const BASE_URL = 'https://ca-microblog-backend.herokuapp.com';

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export function editPost(post) {
    return {
        type: EDIT_POST,
        post
    }
}

export function deletePost(postId) {
    return {
        type: DELETE_POST,
        postId
    }
}

export function addComment(postId, text) {
    return {
        type: ADD_COMMENT,
        payload: text,
        postId,
        commentId: uuid()
    }
}

export function deleteComment(postId, commentId) {
    return {
        type: DELETE_COMMENT,
        postId,
        commentId
    }
}

export function updateVote(postId, delta) {
    return {
        type: UPDATE_VOTE,
        postId,
        delta
    }
}


export function getTitlesFromAPI() {
    return async function (dispatch) {
        dispatch(startLoad());

        try {
            const res = await axios.get(`${BASE_URL}/api/posts`);
            const titles = res.data;

            dispatch(gotTitles(titles))
        } catch (err) {
            console.log(err);
            const errMsg = err.response.data;
            dispatch(showErr(errMsg));
        }
    }
}

export function getPostFromAPI(id) {
    return async function (dispatch) {
        dispatch(startLoad());

        try {
            const res = await axios.get(`${BASE_URL}/api/posts/${id}`);
            const post = res.data;

            dispatch(gotPost(id, post))
        } catch (err) {
            console.log(err);
            const errMsg = err.response.data;
            dispatch(showErr(errMsg));
        }
    }
}

export function addPostToAPI(post) {
    return async function (dispatch) {
        dispatch(startLoad());

        try {
            const res = await axios.post(`${BASE_URL}/api/posts`, post);
            const createdPost = res.data;

            dispatch(addPost(createdPost))
        } catch (err) {
            console.log(err);
            const errMsg = err.response.data;
            dispatch(showErr(errMsg));
        }
    }
}

export function editPostFromAPI(id, post) {
    return async function (dispatch) {
        dispatch(startLoad());

        try {
            const res = await axios.put(`${BASE_URL}/api/posts/${id}`, post);
            const updatedPost = res.data;

            dispatch(editPost(updatedPost))
        } catch (err) {
            console.log(err);
            const errMsg = err.response.data;
            dispatch(showErr(errMsg));
        }
    }
}

export function deletePostFromAPI(id) {
    return async function (dispatch) {
        dispatch(startLoad());

        try {
            let res = await axios.delete(`${BASE_URL}/api/posts/${id}`);
            const resMsg = res.data;
            
            dispatch(deletePost(id))
        } catch (err) {
            console.log(err);
            const errMsg = err.response.data;
            dispatch(showErr(errMsg));
        }
    }
}

export function addCommentToAPI(postId, text) {
    return async function (dispatch) {
        try {
            const res = await axios.post(`${BASE_URL}/api/posts/${postId}/comments`, text);
            dispatch(addComment(postId, text))
            return res.data;
        } catch (err) {
            const errMsg = err.response.data;
            dispatch(showErr(errMsg));
        }
    }
}

export function deleteCommentFromAPI(postId, commentId) {
    return async function (dispatch) {
        try {
            const res = await axios.delete(`${BASE_URL}/api/posts/${postId}/comments/${commentId}`);
            dispatch(deleteComment(postId, commentId));
            return res.data;
        } catch (err){
            const errMsg = err.response.data;
            dispatch(showErr(errMsg));
        }
    }
}

export function updateVoteToAPI(postId, delta) {
    return async function (dispatch) {
        try {
            const res = await axios.post(`${BASE_URL}/api/posts/${postId}/vote/${delta}`);
            dispatch(updateVote(postId, delta));
            return res.data;
        } catch (err) {
            const errMsg = err.response.data;
            dispatch(showErr(errMsg));
        }
    }
}

function gotTitles(titles) {
    return {
        type: LOAD_TITLES,
        titles
    };
}

function gotPost(id, post) {
    return {
        type: LOAD_POST,
        postId: id, 
        post
    };
}

function startLoad() {
    return {
        type: SHOW_SPINNER
    }
}

function showErr(msg) {
    return {
        type: SHOW_ERR,
        msg
    };
}