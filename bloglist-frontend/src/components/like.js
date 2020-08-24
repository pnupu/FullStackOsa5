import React from 'react'
import blogService from '../services/blogs'

const AddLike = () => {
    const addlike = async (blog) => {
  try {
    const bloglike = {
      ...blog.blog, likes: (blog.blog.likes + 1)
    }
    await blogService.update(bloglike)
    getBlogs()
    blogsorter()
  } catch(error) {
    console.log('something went wrong with adding a like')
  }
}
}
export default AddLike