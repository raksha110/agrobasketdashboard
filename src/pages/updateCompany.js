import React from "react"
import Header from "../components/Header/header"
import SEO from "../components/seo"
import UpdateCompanyComponent from "../components/UpdateCompanyComponent/updateCompanyComponent"
import "../styles/style.css"

const UpdateCompany = () => {
  return (
    <div>
      <SEO title="Agrobasket | Update Company" />
      <Header></Header>
      <UpdateCompanyComponent></UpdateCompanyComponent>
    </div>
  )
}

export default UpdateCompany
