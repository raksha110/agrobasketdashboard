import React, { useState } from "react"
import "../../styles/style.css"
import { Alert } from "react-bootstrap"
import { navigate } from "gatsby"
import { handleLogin } from "../../services/auth"

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue)
  const handleChange = e => {
    setValue(e.target.value)
  }
  return {
    value,
    onChange: handleChange,
  }
}

const Login = () => {
  const emailId = useFormInput("")
  const password = useFormInput("")
  const [alert, setAlert] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    const data = {
      password: password.value,
      emailId: emailId.value,
    }
    const res = await handleLogin(data)
    if (res) {
      setAlert(<Alert variant="success">Login Successfully.</Alert>)
      setTimeout(() => {
        navigate("/dashboard")
      }, 1000)
    } else {
      setAlert(<Alert variant="danger">Your Email Id and Password do not match.</Alert>)
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  }

  return (
    <section className="py-6" id="login">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto text-center">
            <h2 className="font-weight-bold">Company Login</h2>
          </div>
        </div>

        <div className="my-4 mx-auto">{alert !== null ? alert : <></>}</div>

        <div className="row mt-5">
          <div className="col-md-6 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                      name="emailId"
                      required
                      {...emailId}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      required
                      {...password}
                    />
                  </div>
                </div>
              </div>
              <div className="text-center mt-3">
                <button
                  type="submit"
                  name="action"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
