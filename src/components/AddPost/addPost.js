import React, { useState, useEffect } from "react"
import "../../styles/style.css"
import axios from "axios"
import { addPost } from "../../services/post"
import { Alert } from "react-bootstrap"
import { navigate } from "gatsby"

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

const AddPost = () => {
  const [alert, setAlert] = useState(null)
  const [cropList, setCropList] = useState([])
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const cropId = useFormInput("")
  const units = useFormInput("")
  const price = useFormInput("")
  const duration = useFormInput("")
  const month = useFormInput("")

  useEffect(() => {
    async function fetchCrops() {
      const res = await axios.get(
        "https://agrobasket.herokuapp.com/getBaseCrop"
      )
      setCropList(res.data)
    }
    fetchCrops()
  }, [])
  const handleSubmit = async e => {
      e.preventDefault();
      const res = await addPost({
        cropId : cropId.value,
        units : units.value,
        price : price.value,
        duration : duration.value,
        startMonth : month.value
      });
      console.log(res);
      if(res){
        setAlert(
            <Alert variant="success">
              Post Successful.
            </Alert>
          )
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
      }else{
        setAlert(
            <Alert variant="danger">
              Post Un-Successful.
            </Alert>
          )
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000)
      }
  }
  return (
    <section className="py-6" id="signup">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto text-center">
            <h2 className="font-weight-bold">Add a Post</h2>
          </div>
        </div>
        <div className="my-4 mx-auto">{alert !== null ? alert : <></>}</div>

        <div className="row mt-5">
          <div className="col-md-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="cropId"
                      required
                      placeholder="Choose Crop"
                      {...cropId}
                    >
                      <option value="">Choose Crop</option>
                      {cropList.map(data => {
                        return (
                          <option key={data._id} value={data._id}>
                            {data.cropName}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Units"
                      name="units"
                      required
                      {...units}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Set Price"
                      name="price"
                      required
                      {...price}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <input
                      type="number"
                      min="1"
                      max="36"
                      className="form-control"
                      placeholder="Choose Duration (In Months | Between 1 to 36)"
                      name="duration"
                      required
                      {...duration}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="startMonth"
                      required
                      placeholder="Choose Month"
                      {...month}
                    >
                      <option value="">Choose Month</option>
                      {monthList.map((month)=>{
                          return(
                            <option key={month} value={month}>{month}</option>
                          )                          
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="text-center mt-3">
                <button type="submit" name="action" className="btn btn-primary">
                  Add Post
                </button>
                <a href="/dashboard" type="submit" name="action" className="btn btn-dark ml-2">
                  Cancel
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddPost
