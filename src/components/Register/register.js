import React, { useState } from "react"
import "../../styles/style.css"
import { Alert } from "react-bootstrap"
import { navigate } from "gatsby"
import {handleRegister} from "../../services/auth"

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

const Register = () => {
  const companyName = useFormInput("")
  const phoneNumber = useFormInput("")
  const companyType = useFormInput("")
  const emailId = useFormInput("")
  const password = useFormInput("")
  const confirmPassword = useFormInput("")
  const companyAccountOwnerName = useFormInput("")
  const bankAccountHolderName = useFormInput("")
  const bankIfscCode = useFormInput("")
  const bankAccountNumber = useFormInput("")
  const companyAddress = useFormInput("")

  const [alert, setAlert] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    if (password.value === confirmPassword.value) {
      const data = {
        companyName: companyName.value,
        password: password.value,
        phoneNumber: phoneNumber.value,
        emailId: emailId.value,
        companyAddress: companyAddress.value,
        companyType: companyType.value,
        companyAccountOwnerName: companyAccountOwnerName.value,
        bankAccountHolderName: bankAccountHolderName.value,
        bankIfscCode: bankIfscCode.value,
        bankAccountNumber: bankAccountNumber.value,
      }
      const res = await handleRegister(data);
      if(res){
        setAlert(
          <Alert variant="success">
            Registered Successfully.
          </Alert>
        )
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000)  
      }
    } else {
      setAlert(
        <Alert variant="danger">
          Please check your data.
        </Alert>
      )
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  }

  return (
    <section className="py-6" id="signup">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto text-center">
            <h2 className="font-weight-bold">Register Your Company</h2>
          </div>
        </div>
        <div className="my-4 mx-auto">{alert !== null ? alert : <></>}</div>

        <div className="row mt-5">
          <div className="col-md-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company name"
                      name="companyName"
                      required
                      {...companyName}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      maxLength="10"
                      required
                      {...phoneNumber}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="companyType"
                      required
                      placeholder="Choose Company Type"
                      {...companyType}
                    >
                      <option value="">Choose Company Type</option>
                      <option value="Public">Public Company</option>
                      <option value="Private">Private Company</option>
                      <option value="Multi National">
                        Multi National Company
                      </option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
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
                <div className="col-md-6">
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
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm password"
                      name="confirmPassword"
                      required
                      {...confirmPassword}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company Owner Name"
                      name="companyAccountOwnerName"
                      required
                      {...companyAccountOwnerName}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Bank Account Holder Name"
                      name="bankAccountHolderName"
                      required
                      {...bankAccountHolderName}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Bank Account IFSC Code"
                      name="bankIfscCode"
                      required
                      maxLength="10"
                      {...bankIfscCode}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Bank Account Number"
                      name="bankAccountNumber"
                      required
                      maxLength="15"
                      {...bankAccountNumber}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company Address"
                      name="companyAddress"
                      required
                      {...companyAddress}
                    />
                  </div>
                </div>
              </div>
              <div className="text-center mt-3">
                <button type="submit" name="action" className="btn btn-primary">
                  Create Your Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Register
