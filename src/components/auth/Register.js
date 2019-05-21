import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {},
      errors: ''
    }


    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange({target: { value, name }}){
    const data = {...this.state.data, [name]: value}
    this.setState({ data, errors: '' })
  }

  handleSubmit(e){
    e.preventDefault()
    axios
      .post('api/register', this.state.data)
      .then((res)=>{
        Auth.setToken(res.data.token)
        this.setState({ data: {}})
        this.props.changeState()
      })
      .catch(err => this.setState({errors: err.response.data}))
  }

  render() {
    let button
    const {password: errPass, password_confirmation: errPassCon} = this.state.errors
    const {password, username, email, password_confirmation: passwordConfirmation} = this.state.data
    if (!email || !username || !password || !passwordConfirmation) {
      button = <button disabled className="button is-info">Register</button>
    } else {
      button = <button className="button is-info">Register</button>
    }
    return (
      <main className="section">
        <div className="container">
          <div className="logo"></div>
          <form onSubmit={this.handleSubmit}>
            <h2 className="title is-4">Register</h2>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  name="username"
                  placeholder="Username"
                  value={username || ''}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  name="email"
                  placeholder="Email"
                  value={email || ''}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  type="password"
                  className="input"
                  name="password"
                  placeholder="Password"
                  value={password || ''}
                  onChange={this.handleChange}
                />
              </div>
              {errPass &&
                 <small className="help is-danger">{errPass}
                 </small>
              }
            </div>
            <div className="field">
              <div className="control">
                <input
                  type="password"
                  className="input"
                  name="password_confirmation"
                  placeholder="Password confirmation"
                  value={passwordConfirmation || ''}
                  onChange={this.handleChange}
                />
              </div>
              {errPassCon &&
                <small className="help is-danger">{errPassCon}
                </small>
              }
            </div>
            {button}

          </form>
          <a
            className="swap_form"
            onClick={this.props.handleToggle}
          >
          Already a member? Sign in
          </a>
        </div>
      </main>
    )
  }
}

export default Register
