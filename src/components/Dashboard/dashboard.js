import { faEye, faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { getToken } from "../../services/auth"
import "../../styles/style.css"
import "./dashboard.css"
import axios from "axios"

const SinglePost = data => {
  return (
    <tr>
      <th scope="row">
        <div class="media align-items-center">
          <div>
            <img
              alt="Image placeholder"
              src={data.data.crop[0].cropImage}
              class="avatar  rounded-circle avatar-sm"
              height="75"
            />
          </div>
          <div class="media-body ml-4 font-weight-normal">
            <span className="font-weight-bold">
              {data.data.crop[0].cropName} &ndash; {data.data.startMonth} <br />
            </span>
            {data.data.duration} months contract <br />
            Rs. {data.data.price} per unit
          </div>
        </div>
      </th>
      <td>{data.data.units}</td>
      <td>{data.data.availableUnits}</td>
      <td>
        <a
          href={"/viewPostLog/" + data.data._id}
          type="button"
          class="btn btn-dark rounded-pill py-2 px-4 mr-2"
        >
          <FontAwesomeIcon icon={faEye} /> &nbsp; View Progress Log
        </a>
        <a
          href={"/updatePostUnits/" + data.data._id}
          type="button"
          class="btn btn-dark rounded-pill py-2 px-4"
        >
          <FontAwesomeIcon icon={faPencilAlt} /> &nbsp; Edit Details
        </a>
      </td>
    </tr>
  )
}

const Dashboard = () => {
  const [posts, setPosts] = useState([])
  const [companyInfo, setCompanyInfo] = useState("")

  useEffect(() => {
    async function fetchPosts() {
      const token = getToken()
      const res = await axios.get(
        "https://agrobasket.herokuapp.com/getPostsForCompany",
        { headers: { Authorization: token } }
      )
      const companyInfoRes = await axios.get(
        "https://agrobasket.herokuapp.com/getCompanyDetailById",
        { headers: { Authorization: token } }
      )
      console.log(res.data)
      setPosts(res.data)
      console.log(companyInfoRes.data[0])
      setCompanyInfo(companyInfoRes.data[0])
    }
    fetchPosts()
  }, [])
  return (
    <section>
      <div className="">
        <div className="container p-4">
          <div className="row mb-3">
            <div className="col-md-12">
              <div class="bg-dark card circle-50 card-fluid p-2">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col-md-8">
                      <p className="font-weight-bold mb-0 text-primary">
                        {companyInfo.companyName}
                      </p>
                      <small class="d-block text-muted">
                        {companyInfo.companyAddress}
                      </small>
                      <br />
                      {companyInfo.companyAccountOwnerName} <br />{" "}
                      {companyInfo.emailId} <br /> {companyInfo.phoneNumber}
                      <br /> {companyInfo.companyType} Company
                      <p className="mt-2">
                        Account Holder &ndash;{" "}
                        {companyInfo.bankAccountHolderName} <br />
                        IFSC Code &ndash; {companyInfo.bankIfscCode} <br />
                        Account Number &ndash; {companyInfo.bankAccountNumber}
                      </p>
                    </div>
                    <div class="ml-auto mr-3">
                      <table className="table-height">
                        <tbody>
                          <tr>
                            <td class="align-top">
                              <a
                                href={"/updateCompany"}
                                type="button"
                                class="btn btn-primary rounded-pill py-2 px-4"
                              >
                                <FontAwesomeIcon icon={faPencilAlt} /> &nbsp;
                                Edit
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5 mb-3">
            <div className="ml-auto mr-3">
              <a
                href="/addPost"
                type="button"
                class="btn btn-dark rounded-pill py-2 px-4"
              >
                <FontAwesomeIcon icon={faPlus} /> &nbsp; Add Post
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div class="card card-fluid">
                <div class="card-header border-0">
                  <h5 class="mb-0 font-weight-bold">My Posts</h5>
                </div>
                <div class="table-responsive">
                  <table class="table align-items-center">
                    <thead>
                      <tr>
                        <th scope="col" class="sort" data-sort="crop">
                          Crop
                        </th>
                        <th scope="col" class="sort" data-sort="units">
                          Units
                        </th>
                        <th scope="col" class="sort" data-sort="available">
                          Available Units
                        </th>
                        <th scope="col" class="sort" data-sort="actions">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody class="list">
                      {posts.map(post => {
                        return (
                          <SinglePost key={post._id} data={post}></SinglePost>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
