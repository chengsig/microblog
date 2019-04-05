import { ADD_POST, EDIT_POST, DELETE_POST, ADD_COMMENT, DELETE_COMMENT, LOAD_TITLES, LOAD_POST, SHOW_SPINNER, SHOW_ERR } from "./actionTypes";
import uuid from "uuid/v4";
import axios from "axios";

const BASE_URL = 'http://localhost:5000/api';

export function addPost(post) {
    return {
        type: ADD_POST,
        payload: post,
        postId: uuid()
    }
}

export function editPost(id, post) {
    return {
        type: EDIT_POST,
        payload: post,
        postId: id
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