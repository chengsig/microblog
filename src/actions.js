import { ADD_POST, EDIT_POST, DELETE_POST, ADD_COMMENT, DELETE_COMMENT } from "./actionTypes";

export function addPost(post){
    return {
        type: ADD_POST,
        payload: post
    }
}

export function editPost(post){
    return {
        type: EDIT_POST,
        payload: post
    }
}

export function deletePost(post){
    return {
        type: DELETE_POST,
        payload: post
    }
}

export function addComment(comment){
    return {
        type: ADD_COMMENT,
        payload: comment
    }
}

export function deleteComment(comment){
    return {
        type: DELETE_COMMENT,
        payload: comment
    }
}