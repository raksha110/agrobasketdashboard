import React from "react"
import "../styles/style.css"
import Header from "../components/Header/header"
import AddPost from "../components/AddPost/addPost"
import SEO from "../components/seo"

const AddPostPage = () => {
  return (
    <div>
      <SEO title="Agrobasket | Add Post" />
      <Header></Header>
      <AddPost></AddPost>
    </div>
  )
}

export default AddPostPage
