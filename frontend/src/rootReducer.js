import { ADD_POST, EDIT_POST, DELETE_POST, ADD_COMMENT, DELETE_COMMENT, LOAD_TITLES, LOAD_POST } from "./actionTypes";


const DEFAULT_STATE = {
    posts: {}, //postId as key {postId: {...post, comments: [{1: "wow"}, {2: ""...}], ...}
    titles: [] // [{id, title, description} ...]
};

function rootReducer(state = DEFAULT_STATE, action) {
    //adding a post to store state
    if (action.type === ADD_POST) {
        let newPost = action.post;
        delete newPost.body

        return {
            ...state,
            titles: [ ...state.titles, newPost ]
        }
    }

    //editing a post. if post has comments, move comments over.
    if (action.type === EDIT_POST) {
        // let oldComments = state.posts[postId].comments;
        let postId = action.post.id
        let oldTitles = state.titles.filter(t => t.id !== action.post.id)
        return {
            ...state,
            titles: [ ...oldTitles, {...action.post} ],
            posts: { ...state.posts, 
                     [postId]: { ...action.post[postId], 
                                 comments: [ ...action.post[postId].comments ]
                                }
                    }
        }
    }

    //immutability remove key from object by destructuring
    if (action.type === DELETE_POST) {
        let postId = action.postId;
        
        let updatedPosts = { ...state.posts }
        delete updatedPosts[postId]

        let updatedTitles = state.titles.filter(t => t.id !== +postId)
        return {
            ...state,
            posts: { ...updatedPosts },
            titles: [ ...updatedTitles ]
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
                    comments: [
                        ...currPost.comments,
                        {id: [action.commentId], text: action.payload.text}
                    ]
                }
            }
        }
        return result
    }

    //immutably remove the comment from post by postId
    if (action.type === DELETE_COMMENT) {
        let postId = action.postId;
        let commentId = action.commentId;

        let updatedComments = state.posts[postId].comments.filter(c => c.id !== +commentId)

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

    // retrieves all titles from database and adds to store state
    if (action.type === LOAD_TITLES){
        let titles = action.titles;

        return { 
            ...state, 
            titles: [ ...titles ]
        }
    }

    // retrieves one post detail from database and adds to store state
    if (action.type === LOAD_POST){
        let post = action.post;
        let id = action.postId; 
        
        return { 
            ...state, 
            posts: { 
                     ...state.posts, 
                     [id]: { ...post }
            } 
        }
    }

    return state;
}

export default rootReducer;
