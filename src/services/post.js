import axios from "axios"
import { getToken } from "../services/auth"

export const addPost = async data => {
  const token = getToken()
  const res = await axios.post(
    "https://agrobasket.herokuapp.com/addPost",
    data,
    { headers: { Authorization: token } }
  )
  console.log(res.data.msg)
  if (res.data.msg === "Post Added successfully") {
    return true
  } else {
    return false
  }
}

export const getProgressLog = async postId => {
  const token = getToken()
  const res = await axios.post(
    "https://agrobasket.herokuapp.com/getTransactionAndProgressForCompany",
    postId,
    { headers: { 'Authorization': token, 'Content-Type' : "application/json" } }
  )
  // console.log(res.data.msg)
  return res.data;
}

export const closeTransaction = async transactionId => {
  const token = getToken()
  const res = await axios.post(
    "https://agrobasket.herokuapp.com/closeTransaction",
    transactionId,
    { headers: { 'Authorization': token, 'Content-Type' : "application/json" } }
  )
  console.log(res.data.msg)
  return res.data;
}

export const updatePostUnitsRoute = async data => {
  const token = getToken()
  const res = await axios.post(
    "https://agrobasket.herokuapp.com/updatePostUnitsForCompanyById",
    data,
    { headers: { 'Authorization': token, 'Content-Type' : "application/json" } }
  )
  console.log(res.data.msg)
  return res.data;
}

export const updateCompanyDetails = async data => {
  const token = getToken()
  const res = await axios.post(
    "https://agrobasket.herokuapp.com/updateCompanyDetailById",
    data,
    { headers: { 'Authorization': token, 'Content-Type' : "application/json" } }
  )
  console.log(res.data.msg)
  return res.data;
}
