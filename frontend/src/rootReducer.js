import { ADD_POST, EDIT_POST, DELETE_POST, ADD_COMMENT, DELETE_COMMENT } from "./actionTypes";


const DEFAULT_STATE = {
    posts: {}, //postId as key {postId: {...post, comments: {1: "wow", 2: ""...}}, ...}
};

function rootReducer(state = DEFAULT_STATE, action) {
    //adding a post to store state
    if (action.type === ADD_POST) {
        return {
            ...state,
            posts: { ...state.posts, [action.postId]: { ...action.payload, comments: {} } }
        }
    }

    //editing a post. if post has comments, move comments over.
    if (action.type === EDIT_POST) {
        let postId = action.postId;
        let oldComments = state.posts[postId].comments;
        return {
            ...state,
            posts: { ...state.posts, [postId]: { ...action.payload, comments: { ...oldComments } } }
        }
    }

    //immutability remove key from object by destructuring
    if (action.type === DELETE_POST) {
        let postId = action.payload;

        let updatedPosts = { ...state.posts }
        delete updatedPosts[postId]

        return {
            ...state,
            posts: updatedPosts
        }
        // for self note delete later: delete stateCopy.posts[postId]; // mutating
    }

    //adding comment to specific post
    if (action.type === ADD_COMMENT) {
        let postId = action.postId;
        let currPost = state.posts[postId];

        let result = {
            posts: {
                ...state.posts,
                [action.postId]: {//postId
                    ...currPost,
                    comments: {
                        ...currPost.comments,
                        [action.commentId]: action.payload.comment
                    }
                }
            }
        }

        return result
    }

    //immutably remove the comment from post by postId
    if (action.type === DELETE_COMMENT) {
        let postId = action.postId;
        let commentId = action.commentId;

        let updatedComments = { ...state.posts[postId].comments }
        delete updatedComments[commentId]

        return {
            ...state,
            posts: {
                ...state.posts,
                [postId]: { ...state.posts[postId], comments: updatedComments }
            }
        }

        //note to self for bug journal later             let stateCopy = { ...state }
        // delete stateCopy.posts[postId].comments[commentId];
        // return { ...stateCopy };
    }

    return state;
}

export default rootReducer;
