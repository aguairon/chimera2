import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import FormButton from '../common/FormButton'
import ModalSwapLink from './ModalSwapLink'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
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
    const {password: errPass, password_confirmation: errPassCon} = this.state.errors
    const {password, username, email, password_confirmation: passwordConfirmation} = this.state.data

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
                 <span className="help is-danger">{errPass}
                 </span>
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
                <span className="help is-danger">{errPassCon}
                </span>
              }
            </div>
            <FormButton data = {this.state.data} action = "Register" type='is-info'/>

          </form>
          <ModalSwapLink handleToggle = {this.props.handleToggle} message='Already a member? Sign in'/>
        </div>
      </main>
    )
  }
}

export default Register
