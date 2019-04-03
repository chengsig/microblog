import { ADD_POST, EDIT_POST, DELETE_POST, ADD_COMMENT, DELETE_COMMENT } from "./actionTypes";
import uuid from "uuid/v4";

const DEFAULT_STATE = {
    posts: {}, //postId as key {postId: {...post}, ...}
    comments: {} //{postId: {commentId: "comment", ...}, ...}
};

function rootReducer(state=DEFAULT_STATE, action) {
    if (action.type === ADD_POST) {
        const postId = uuid();
        return { 
            ...state,
            posts: {...state.posts, [postId]: action.payload }
        }
    }
    if(action.type === EDIT_POST) {
        let postId = state.posts.postId;
        return {
            ...state,
            posts: {...state.posts, [postId]: {...action.payload} }
        }
    }
    if (action.type === DELETE_POST) {
        let stateCopy = { ...state }
        delete stateCopy.posts.postId;
        delete stateCopy.comments.postId;
        return stateCopy;
    }
    if ()
    return { ...state };
}

export default rootReducer;
