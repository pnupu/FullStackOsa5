import React from 'react'
import PropTypes from 'prop-types'

const loginForm = (props) => {
  return(
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={props.handleSubmit}>
        <div>
           username
          <input id='username' type="text" value={props.username} name="username" onChange={props.handleUsernameChange}/>
        </div>
        <div>
          password
          <input id='password' type="text" value={props.password} name="password" onChange={props.handlePasswordChange}/>
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )

}
loginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default loginForm