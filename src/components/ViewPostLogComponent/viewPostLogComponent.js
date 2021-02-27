import {
  faArrowLeft,
  faCaretDown,
  faEye,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useEffect } from "react"
import { Accordion, Button, Card } from "react-bootstrap"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { getProgressLog, closeTransaction } from "../../services/post"
import "./ViewPostLogComponent.css"

const titleCase = str => {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase())
    })
    .join(" ")
}

const getMonthFromString = mon => {
  console.log(new Date(Date.parse(mon + " 1, 2021")).getMonth() + 1)
  return new Date(Date.parse(mon + " 1, 2021")).getMonth() + 1
}

const SliderCards = ({ key, img, title }) => {
  return (
    <div className="card px-2" key={key}>
      <div className="bg-light align-items-center">
        <img
          className="card-img-top img-raised img-helper"
          src={img}
          alt="Progress"
          height="250"
        />
        <div className="card-body">
          <h5 className="card-title text-center font-weight-bold mb-2 text-primary">
            {title}
          </h5>
        </div>
      </div>
    </div>
  )
}

const SingleFarmerLog = ({ eventKey, data }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
  }
  const startDate = new Date(data.createdDate)
  console.log(startDate.setMonth(getMonthFromString(data.post.startMonth)))
  startDate.setMonth(getMonthFromString(data.post.startMonth) - 1, 1)

  const endDate = new Date(data.createdDate)
  endDate.setMonth(startDate.getMonth() + (data.post.duration - 1))

  const closeTransactionHandler = async e => {
    e.preventDefault()
    const res = await closeTransaction({ transactionId: data._id })
    console.log(res.msg)
    if (window) {
      window.location.reload()
    }
  }

  return (
    <Card className="mb-4">
      <Card.Header className="bg-dark">
        <span class="text-primary float-right pt-3">
          {data.isActive ? (
            <span class="badge badge-primary">Active Transaction</span>
          ) : (
            <span class="badge badge-light">Inactive Transaction</span>
          )}{" "}
        </span>
        <button
          type="button"
          class="btn btn-link mr-2 float-right text-capitalize"
          onClick={closeTransactionHandler}
          disabled={!data.isActive}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" /> <br /> Close
        </button>
        <Accordion.Toggle
          as={Button}
          variant="link"
          eventKey={eventKey}
          className="float-right text-capitalize"
        >
          <FontAwesomeIcon icon={faEye} size="lg" /> <br /> View
        </Accordion.Toggle>

        <p className="mt-2 mb-2 text-primary">
          {data.farmer[0].fullname}
          <br />
          <span class="text-muted">
            +91 {data.farmer[0].phoneNumber} &nbsp;
          </span>
          <span class="text-muted">
            <br /> {titleCase(data.farmer[0].locationCity)},{" "}
            {data.farmer[0].locationState} <br />
          </span>
        </p>
        <p class="mt-2 text-white">
          {data.crop[0].cropName} : {data.unit} units * {data.price} Rs. per
          unit = {data.unit * data.price} Rs. <br />
          From {startDate.toDateString()} to {endDate.toDateString()}
        </p>
      </Card.Header>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body className="bg-light">
          <div className="row">
            <div className="col-md-12 mx-auto">
              <Slider
                {...settings}
                dots={true}
                slidesToShow={
                  data.progress.length > 4 ? 4 : data.progress.length
                }
              >
                {data.progress.map(progressData => {
                  console.log(progressData)
                  return (
                    <SliderCards
                      key={progressData._id}
                      img={progressData.cropPhotoURL}
                      title={progressData.stage}
                    ></SliderCards>
                  )
                })}
              </Slider>
            </div>
          </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

const ViewPostLogComp = ({ id }) => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    async function getLog() {
      const res = await getProgressLog({ postId: id })
      console.log(res)
      setTransactions(res)
    }
    getLog()
  }, [])

  return (
    <section>
      <div className="">
        <a href="/dashboard" className="btn btn-dark mb-2 ml-5">
          <FontAwesomeIcon icon={faArrowLeft} size="lg" /> &nbsp; Back
        </a>

        <div className="container p-4">
          <div className="row mb-3">
            <div className="col-md-12">
              <Accordion defaultActiveKey="0">
                {transactions.map(data => {
                  return (
                    <SingleFarmerLog
                      eventKey={data._id}
                      data={data}
                    ></SingleFarmerLog>
                  )
                })}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ViewPostLogComp
