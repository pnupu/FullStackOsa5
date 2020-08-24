import React, { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notifications'
import Togglable from './components/togglable'
import LoginForm from './components/loginform'
import BlogForm from './components/blogForm'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [ message, setMessage ] = useState(null)
  const [ className, setClassName ] = useState('success')
  const [loginVisible, setLoginVisible] = useState(false)
  const BlogFormRef = useRef()
  useEffect(() => {
    getBlogs()
  }, [])
  const getBlogs = async () => {
    try {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )

    } catch(error) {
      console.log('error getting blocks')
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const createBlog = async (BlogObject) => {
    try {

      const newblog = await blogService.put(BlogObject)
      console.log('new blog created', newblog)
      getBlogs()
      BlogFormRef.current.toggleVisibility()
      setClassName('success')
      setMessage('new blog created')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch(error) {
      setClassName('error')
      setMessage('something went wrong with blog creation')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addLike = async (blog) => {
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
  const blogsorter = () => {
    blogs.sort((a, b) => {
      return a.likes < b.likes ? 1 : -1
    })

  }
  blogsorter()
  const blogFrom = () => (

    <div>
      <p>{user.name} logged in </p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel='new blog' ref={BlogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
    </div>
  )


  const deleteBlog = async (blog) => {
    console.log(blog)
    try {
      if (window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
        const blogId = blog.id
        await blogService.remove(blogId)
      }
      getBlogs()
    } catch(error) {
      console.log('something went wrong with deleting the blog')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setClassName('success')
      setMessage('welcome', user.name)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exeption) {
      console.log('wrong credentials')
      setClassName('error')
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const loginFrom = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setClassName('success')
    setMessage('logget out')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (

    <div>
      <h2>Blogs</h2>
      <Notification message={message} className={className}/>
      {user === null ? loginFrom() : blogFrom()}
      {blogs.map(blog =>

        <Blog key={blog.id} blog={blog} user={user} addLike={addLike} deleteBlog={deleteBlog} />

      )}


    </div>
  )
}


export default App