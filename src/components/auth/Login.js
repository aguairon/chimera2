import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
// src/lib/Auth.js
import FormButton from '../common/FormButton'
import ModalSwapLink from './ModalSwapLink'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        email: '',
        password: ''
      },
      errors: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({target: { value, name }}){
    const data = {...this.state.data, [name]: value}
    this.setState({ data, errors: '' })
  }

  handleSubmit(e){
    e.preventDefault()
    axios
      .post('api/login', this.state.data)
      .then((res)=>{
        Auth.setToken(res.data.token)
        this.setState({ data: {}})
        this.props.changeState()

      })
      .catch(err => this.setState({errors: err.response.data}))
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <div className="logo"></div>
          <form onSubmit={this.handleSubmit}>
            <h2 className="title is-4">Log in</h2>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  name="email"
                  placeholder="Email"
                  value={this.state.data.email || ''}
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
                  value={this.state.data.password || ''}
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.message && <small className="help is-danger">{this.state.errors.message}</small>}
            </div>
            <FormButton data = {this.state.data} action = "Log In" type='is-info'/>

          </form>
          <ModalSwapLink handleToggle = {this.props.handleToggle} message='Already a member? Sign in'/>
        </div>
      </main>
    )
  }
}

export default Login
