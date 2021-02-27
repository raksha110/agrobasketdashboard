import React from "react"
import SEO from "../components/seo"
import ViewPostLogComp from "../components/ViewPostLogComponent/viewPostLogComponent"
import "../styles/style.css"
import Header from "../components/Header/header";

const ViewPostLog = ({id}) => (
  <div>
    <SEO title="Agrobasket | View Post Progress" />
    <Header></Header>
    <ViewPostLogComp id={id}></ViewPostLogComp>
  </div>
)

export default ViewPostLog