import React, { useRef } from 'react'
import Togglable from './togglable'

const Blog = ({ blog, user, addLike, deleteBlog }) => {
  const handleLike = (event) => {
    event.preventDefault()
    addLike({ blog })
  }

  const handeDelete = (event) => {
    event.preventDefault()
    deleteBlog(blog)
  }
  const BlogFormRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (

    <div style={blogStyle} className='blog'>

      <div>

        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel='show' ref={BlogFormRef}>
        {blog.url}
        <div>
          likes: {blog.likes}
          <button id='like' onClick={handleLike}>like</button>
          <div>
            {user.name}
          </div>
          <button id='delete' onClick={handeDelete}>delete</button>
        </div>
      </Togglable>

    </div>
  )
}

export default Blog
