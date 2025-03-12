import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs: (state, action) => {
            return action.payload
        },
        appendBlog: (state, action) => {
            state.push(action.payload)
        },
        like: (state, action) => {
            const blog = state.find(b => b.id === action.payload)
            if (blog) blog.likes = blog.likes + 1
        },
        remove: (state, action) => {
            state.map(b => {
                if (b.id === action.payload.id) {
                    state.splice(state.indexOf(b), 1)
                }
            })
        }
    }
})

export const getAllBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = blog => {
    return async dispatch => {
        const newBlog = await blogService.createBlog(blog)
        dispatch(appendBlog(newBlog))
    }
}

export const likeBlog = blog => {
    return async dispatch => {
        await blogService.likeBlog(blog)
        dispatch(like(blog.id))
    }
}

export const removeBlog = blog => {
    return async dispatch => {
        await blogService.removeBlog(blog)
        dispatch(remove(blog))
    }
}


export const { setBlogs, appendBlog, like, remove } = blogSlice.actions
export default blogSlice.reducer