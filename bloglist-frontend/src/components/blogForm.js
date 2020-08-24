import React,  { useState } from 'react'



const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')


  const handleblogcreation = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes
    })
    setUrl('')
    setAuthor('')
    setTitle('')
    setLikes('')
  }

  return (
    <div>
      <form onSubmit={handleblogcreation}>
        <br></br>
        <h2>Create new</h2>
        <div>
          Title:
          <input id='title' type="text" value={title} name="Title: " onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          Author:
          <input id='author' type="text" value={author} name="Author: " onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          Url:
          <input id='url' type="text" value={url} name="Url: " onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <div>
          Likes:
          <input id='likes' type="text" value={likes} name="Likes: " onChange={({ target }) => setLikes(target.value)}/>
        </div>
        <button id='submit' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm