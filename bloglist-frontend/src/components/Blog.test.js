import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './blogForm'

test('render author and title', () => {
  const blog = {
    author: 'ilkka',
    title:'naata opas',
    likes: '3',
    url: 'naata.fi'
  }
  const user = {
    name: 'ilkkaL'
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )


  const url = component.container.querySelector('.togglableContent')
  expect(url).toHaveStyle('display: none')

  expect(component.container).toHaveTextContent('ilkka')
  expect(component.container).toHaveTextContent('naata opas')

  component.debug()
})

test('render like and url when button is pressed', () => {
  const blog = {
    author: 'ilkka',
    title:'naata opas',
    likes: '3',
    url: 'naata.fi'
  }
  const user = {
    name: 'ilkkaL'
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  const show = component.getByText('show')
  const url = component.container.querySelector('.togglableContent')
  expect(url).toHaveStyle('display: none')
  fireEvent.click(show)

  expect(url).toHaveStyle('')
})


test('like button is pressed 2 times and we get 2 functioncalls', () => {
  const blog = {
    author: 'ilkka',
    title:'naata opas',
    likes: '3',
    url: 'naata.fi'
  }
  const user = {
    name: 'ilkkaL'
  }
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} AddLike={mockHandler}/>
  )

  const show = component.getByText('show')
  fireEvent.click(show)
  const like = component.getByText('like')

  fireEvent.click(like)
  fireEvent.click(like)

  expect(mockHandler.mock.calls).toHaveLength(2)

})

test('testing blog creation', () => {
  const blog = {
    author: 'ilkka',
    title:'naata opas',
    likes: '3',
    url: 'naata.fi'
  }
  const user = {
    name: 'ilkkaL'
  }
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog}/>
  )
  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const likes = component.container.querySelector('#likes')

  const form = component.container.querySelector('form')

  fireEvent.change(author, { target: { value: blog.author } })
  fireEvent.change(title, { target: { value: blog.title } })
  fireEvent.change(url, { target: { value: blog.url } })
  fireEvent.change(likes, { target: { value: blog.likes } })

  fireEvent.submit(form)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual(blog)
  console.log(createBlog.mock.calls[0])
})