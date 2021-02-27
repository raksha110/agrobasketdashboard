import React, {useEffect} from "react"
import SEO from "../components/seo"
import "../styles/style.css"
import {isLoggedIn} from "../services/auth"
import { navigate } from "gatsby";
import Dashboard from "../components/Dashboard/dashboard";
import Header from "../components/Header/header";

const DashboardPage = () => {
  useEffect(() => {
		if (!isLoggedIn()) {
			navigate("/loginPage");
		}
	}, []);
  return (
    <div>
      <SEO title="Agrobasket | Dashboard" />
      <Header></Header>
      <Dashboard></Dashboard>
    </div>
  )
}

export default DashboardPage
