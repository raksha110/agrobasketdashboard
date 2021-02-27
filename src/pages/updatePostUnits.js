import React from "react"
import SEO from "../components/seo"
import UpdatePostUnitComponent from "../components/UpdatePostUnitComponent/updatePostUnitComponent"
import "../styles/style.css"
import Header from "../components/Header/header";

const UpdatePostUnits = ({id}) => (
  <div>
    <SEO title="Agrobasket | Update Post" />
    <Header></Header>
    <UpdatePostUnitComponent id={id}></UpdatePostUnitComponent>
  </div>
)

export default UpdatePostUnits