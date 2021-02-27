import React, { useEffect, useState } from "react"
import "../../styles/style.css"
import { Alert } from "react-bootstrap"
import { navigate } from "gatsby"
import { updateCompanyDetails } from "../../services/post"
import { getToken } from "../../services/auth"
import axios from "axios"

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue)
  const handleChange = e => {
    setValue(e.target.value)
  }
  const setInitialData = (data) =>{
      setValue(data);
  }
  return {
    value,
    setInitialData,
    onChange: handleChange,
  }
}

const UpdateCompanyComponent = () => {
  useEffect(() => {
    async function fetchCompanyDetails() {
      const token = getToken()
      const res = await axios.get(
        "https://agrobasket.herokuapp.com/getCompanyDetailById",
        { headers: { Authorization: token } }
      )
      console.log(res.data[0])
      companyName.setInitialData(res.data[0].companyName);
      phoneNumber.setInitialData(res.data[0].phoneNumber)
      companyAccountOwnerName.setInitialData(res.data[0].companyAccountOwnerName)
      bankAccountHolderName.setInitialData(res.data[0].bankAccountHolderName)
      bankIfscCode.setInitialData(res.data[0].bankIfscCode)
      bankAccountNumber.setInitialData(res.data[0].bankAccountNumber)
      companyAddress.setInitialData(res.data[0].companyAddress)
    }
    fetchCompanyDetails()
  }, [])

  const companyName = useFormInput("")
  const phoneNumber = useFormInput("")
  const companyAccountOwnerName = useFormInput("")
  const bankAccountHolderName = useFormInput("")
  const bankIfscCode = useFormInput("")
  const bankAccountNumber = useFormInput("")
  const companyAddress = useFormInput("")

  const [alert, setAlert] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    const data = {
      companyName: companyName.value,
      phoneNumber: phoneNumber.value,
      companyAddress: companyAddress.value,
      companyAccountOwnerName: companyAccountOwnerName.value,
      bankAccountHolderName: bankAccountHolderName.value,
      bankIfscCode: bankIfscCode.value,
      bankAccountNumber: bankAccountNumber.value,
    }
    const res = await updateCompanyDetails(data)
    if (res.msg == "Updated Successfully") {
      setAlert(<Alert variant="success">Updated Successfully.</Alert>)
      setTimeout(() => {
        navigate("/dashboard")
      }, 1000)
    } else {
      setAlert(<Alert variant="danger">Please check your data.</Alert>)
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
                  Update Your Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UpdateCompanyComponent
