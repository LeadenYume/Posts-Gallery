import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../App/store";
import { Post } from "../../csts";

export interface PostsState {
    posts: Post[],
    error: boolean
}


const initialState: PostsState = {
    posts: [],
    error: false
}

function filerPost(state: Post[], added: Post[]) {
    return added.filter(post => state.find(x => x.id === post.id) === undefined);
}


export const PostsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPostsEnd: (state, action: PayloadAction<Post[]>) => {
            const added = filerPost(state.posts, action.payload);
            state.posts = state.posts.concat(added);
        },
        addPostsStart: (state, action: PayloadAction<Post[]>) => {
            const added = filerPost(state.posts, action.payload);
            state.posts = action.payload.concat(added);
        },
    }
})

export const postsSelector = (state: RootState) => state.posts;
export const postsReducer = PostsSlice.reducer;
export const { addPostsEnd, addPostsStart } = PostsSlice.actions;