import React, { Component } from 'react'
import Select from "react-select"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import historical from '../../api/v1/historical';
import { Link } from "react-router-dom";

import BacktestWidget from '../../components/BacktestWidget'
import CardWelcome from "./card-welcome"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Col, Row, Container, Card, CardBody, Form, Label, FormGroup} from 'reactstrap';

import {CartesianGrid, ComposedChart, LineChart, Line, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts'

import dayjs from 'dayjs'


class DashboardNebulaBackTester extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      weights:{
        'LUNA':0,
        'UST':0,
        'aUST':0,
        'ANC':0,
        'ASTRO':0,
        'PRISM':0
      },
      dates: [dayjs().subtract(6, 'month').toDate(), dayjs().toDate()],
      sumweights:0,
      assets1:[
        {
          title: 'LUNA',
          ticker: 'LUNA',
        },
        {
          title: 'UST',
          ticker: 'UST',
        },

        {
          title: 'aUST',
          ticker: 'aUST',
        },
      ],
      assets2:[
        {
          title: 'ANC',
          ticker: 'ANC',
        },
        {
          title: 'ASTRO',
          ticker: 'ASTRO',
        },

        {
          title: 'PRISM',
          ticker: 'PRISM',
        },
      ],
      
    }
    this.handleWeights= this.handleWeights.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.sumWeights=this.sumWeights.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }


  //sumweights 
  sumWeights() {
    let weights = []
    const reducer = (accumulator, curr) => accumulator + curr;
    Object.keys(this.state.weights).forEach(key => {
      weights.push(this.state.weights[key])
      }
    ) 
    this.setState({sumweights:weights.reduce(reducer)},
    function () {
    console.log('Sum Weights: '+this.state.sumweights);
    console.log('Number of Assets in Data: '+ this.state.data.length);
      });
  }

  //update weights
  handleWeights(input) {
    const target = input.target;
    const value = target.value;
    const name = target.name;
    this.setState(prevState => ({
      weights: {
        ...prevState.weights,
        [name]: Number(value)
      }
    }), this.sumWeights)
  }

  handleClear = (e) => {
    //prevent reset
    e.preventDefault()
    //clear boxes
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );

    const assets = Object.keys(this.state.weights)
    assets.forEach(x => {
    this.setState(prevState => ({
      weights: {
        ...prevState.weights,
        [x]: 0
      },
      data:[]
    }), this.sumWeights)})

  }

  handleStartDateChange(date) {
    let newDates = [date, this.state.dates[1]]
    this.setState({
      dates: newDates,
    }, () => console.log(newDates))
  }

  handleEndDateChange(date) {
    let newDates = [this.state.dates[0], date]
    this.setState({
      dates: newDates,
    }, () => console.log(newDates))
  }

  //handle backtest button submit
  handleSubmit = (e) => {
    //prevent reset
    e.preventDefault()

    //get assets > 0 weight
    const assets = Object.keys(this.state.weights)
    const assetsToQuery = []
    const datadict = []
    assets.forEach(x => {
      let weight = this.state.weights[x]
      if (weight>0){
        assetsToQuery.push(x)
      }
    })

    //log query and add pending wheel?
    console.log('Querying: '+ assetsToQuery)

    //for each stock with weighting > 0
    assetsToQuery.forEach(a =>{
      
      console.log(a)
      //set filters
      let filters = {
        ticker: a,
        from: this.state.dates[0],
        to: this.state.dates[1],
      }

      //pull data from apis
      historical.getHistoricalBacktester(filters).then(apiData => {

        let formattedData = apiData
          .map(obj => {
            return {date: dayjs(obj.timestamp).format('MM/DD/YYYY'), 
                    name:a,
                    weighted_return:(this.state.weights[a]/100)*obj['pct_change']}
                    
          })

          datadict.push(formattedData)
          this.setState({
            //set data to excpanding datadict
            data:datadict
          }, () => console.log('Pulled Data: '+a+'->'+ 'Number of Assets Now: '+ datadict.length))
      })
    })
    

    //calculate weighted returns by day
  }



  render() {
    return(
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="ALPHALABS" breadcrumbItem="ALPHATESTER" />
          <Row>
            <Col xl="12">
              <CardWelcome />

              {/* Assets Row 1*/}
              <div>
              <Row>
                <BacktestWidget
                  reports={this.state.assets1}
                  action={this.handleWeights}
                />
              </Row>
              </div>

              {/* Assets Row 2*/}
              <div>
              <Row>
                <BacktestWidget
                  reports={this.state.assets2}
                  action={this.handleWeights}
                />
              </Row>

              </div>
              {/* Sum of Weights*/}
              <h4>
                {" Sum of Weights: "}{this.state.sumweights}{" "}
                <i className="mdi ms-1 text-success"/>
              </h4>
              <div>
              
               
             
              {/* Datepicker*/}
              {/* Words*/}
              <FormGroup className="d-inline-block me-2">
              <h4>
                {" Choose Dates: "}
                <i />
              </h4>
              </FormGroup>

              {/* Date Box 1*/}
              <FormGroup className="w-25 d-inline-block pb-2 me-2">
                <DatePicker
                  className="form-control"
                  selected={this.state.dates[0]}
                  onChange={this.handleStartDateChange}
                />
              </FormGroup>
              
              {/* Date Box 2*/}
              <div className="d-inline-block me-2">~</div>
              <FormGroup className="w-25 d-inline-block pb-2">
                <DatePicker
                  className="form-control"
                  selected={this.state.dates[1]}
                  onChange={this.handleEndDateChange}
                />
              </FormGroup>

              {/* Backtest/Clear Buttons*/}
              <Form>
                <button type="submit" onClick={this.handleSubmit}>BACKTEST</button>
                <div style={{paddingTop : "10px"}}>
                <button type="submit" onClick={this.handleClear}>CLEAR</button>
                </div>
              </Form>
             
              </div>


        <Card >
          <CardBody className="card-body-test">
           
              <div style={{height: 600}}>
              <ResponsiveContainer width="100%" height="100%">
              <LineChart width={2000} height={600}
                      margin={{top: 20, right: 30, left: 0, bottom: 0}}>
                <XAxis dataKey='xaxis1' type="category" domain={['dataMin', 'dataMax']} />
                <YAxis  domain={['auto', 'auto']} />
                <Tooltip  />
                <Legend />
                <Line data={this.state.data} type="linear" dataKey="VALUE" dot={false} strokeWidth={4} stroke="#8884d8"/>
             </LineChart>
             </ResponsiveContainer>
             </div>
          </CardBody>
        </Card>








              

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
}


export default DashboardNebulaBackTester
