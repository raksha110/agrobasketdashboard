import React, { useState } from "react"
import { updatePostUnitsRoute } from "../../services/post"
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

const UpdatePostUnitComponent = ({id}) => {
  const units = useFormInput("")
  const [alert, setAlert] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await updatePostUnitsRoute({postId : id, unit : units.value});
    console.log(res.msg);
    if (res.msg == "Updated Successfully") {
        setAlert(<Alert variant="success">Updated Successfully.</Alert>)
        setTimeout(() => {
          navigate("/dashboard")
        }, 1000)
      } else {
        setAlert(<Alert variant="danger">Failed to Update.</Alert>)
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }    
  }

  return (
    <section className="py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto text-center">
            <h2 className="font-weight-bold">Update Post</h2>
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
                      type="number"
                      className="form-control"
                      placeholder="No of more units"
                      name="units"
                      required
                      max={1000}
                      {...units}
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
                  Update Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UpdatePostUnitComponent
