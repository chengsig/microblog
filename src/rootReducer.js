import { ADD_POST, EDIT_POST, DELETE_POST, ADD_COMMENT, DELETE_COMMENT } from "./actionTypes";
import uuid from "uuid/v4";

const DEFAULT_STATE = {
    posts: {}, //postId as key {postId: {...post, comments: {1: "wow", 2: ""...}}, ...}
};

function rootReducer(state = DEFAULT_STATE, action) {
    if (action.type === ADD_POST) {
        const postId = uuid();  // FIXME move this get-id to action creator/component

        return {
            ...state,
            posts: { ...state.posts, [postId]: action.payload }
        }
    }

    if (action.type === EDIT_POST) {
        let postId = state.posts.postId;

        return {
            ...state,
            posts: { ...state.posts, [postId]: { ...action.payload } }
        }
    }

    if (action.type === DELETE_POST) {
        // let stateCopy = { ...state }
        let postId = action.payload;

        let updatedPosts = {...state.posts}
        delete updatedPosts[postId]

        return {
            ...state, 
            posts: updatedPosts
          }
        // delete stateCopy.posts[postId]; // mutating

        // return { ...stateCopy };
    }

    if (action.type === ADD_COMMENT) {
        const commentId = uuid();  // FIXME

        let postId = action.postId;
        let currPost = state.posts[postId];

        let result = {
            posts: {
                ...state.posts,
                [action.postId]: {
                    ...currPost,
                    comments: {
                        ...currPost.comments,
                        [commentId]: action.payload.comment
                    }
                }
            }
        }

        return result
    }

    if (action.type === DELETE_COMMENT) {
        console.log(action.postId, action.commentId)
        let postId = action.postId;
        let commentId = action.commentId;

        let updatedComments = {...state.posts[postId].comments}
        delete updatedComments[commentId]

        return {...state, 
                posts: {
                    ...state.posts, 
                    [postId]: {... state.posts[postId], comments: updatedComments}}}

        //             let stateCopy = { ...state }

        // delete stateCopy.posts[postId].comments[commentId];

        // return { ...stateCopy };
    }

    return state;
}

export default rootReducer;
