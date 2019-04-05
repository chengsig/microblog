import { ADD_POST, EDIT_POST, DELETE_POST, ADD_COMMENT, DELETE_COMMENT, LOAD_TITLES, LOAD_POST, SHOW_SPINNER, SHOW_ERR } from "./actionTypes";
import uuid from "uuid/v4";
import axios from "axios";

const BASE_URL = 'http://localhost:5000/api';

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
        payload: postId
    }
}

export function addComment(postId, comment) {
    return {
        type: ADD_COMMENT,
        payload: comment,
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

export function getTitlesFromAPI() {
    return async function (dispatch) {
        dispatch(startLoad());

        try {
            const res = await axios.get(`${BASE_URL}/posts`);
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
            const res = await axios.get(`${BASE_URL}/posts/${id}`);
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
            const res = await axios.post(`${BASE_URL}/posts`, post);
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
            const res = await axios.put(`${BASE_URL}/posts/${id}`, post);
            const updatedPost = res.data;

            dispatch(editPost(updatedPost))
        } catch (err) {
            console.log(err);
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