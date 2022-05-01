import React, { Component, useState } from 'react'

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import historical from '../../api/v1/historical';

import BacktestWidget from '../../components/BacktestWidget'
import MiniWidget from '../../components/MiniWidget'
import CardWelcome from "./card-welcome"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Col, Row, Container, Card, CardBody, Form, Label, FormGroup} from 'reactstrap';

import {CartesianGrid, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts'

import * as api from '../../helpers/api_helper'

import dayjs from 'dayjs'

function pctFormatter(params) {
  return Number((Number(params)-1)*100).toFixed(2) + '%'
}

const dateFormatter = date => {
  // return moment(date).unix();
  return dayjs(date).format('MM/DD/YYYY');
};

class DashboardNebulaBackTester extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      data2:[],
      bench: [],
      bench2:[],
      weights:{
        'LUNA':0,
        'UST':0,
        'aUST':0,
        'ANC':0,
        'ASTRO':0,
        'PRISM':0
      },
      dates: [dayjs().subtract(3, 'month').toDate(), dayjs().toDate()],
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
      reports : [
        {
          title: "Strategy Sharpe Ratio",
          icon: "mdi mdi-email-open",
          imageUrl: "//alphadefi.fund/wp-content/uploads/2022/03/logo-original-1000-ps_ccexpress.png",
          color: "warning",
          value: "",
          arrow: 'mdi-arrow-up text-success',
          series: [{ name: "Strategy Sharpe Ratio", data: []}],
        },
        {
          title: "Strategy Total Return (%)",
          icon: "mdi mdi-email-open",
          imageUrl: "//alphadefi.fund/wp-content/uploads/2022/03/logo-original-1000-ps_ccexpress.png",
          color: "primary",
          arrow: 'mdi-arrow-down text-danger',
          value: "",
          series:  [{ name: "Strategy Total Return (%)", data: []}],
        },
        {
          title: "Strategy Daily Volatility (%)",
          icon: "mdi mdi-email-open",
          imageUrl: "//alphadefi.fund/wp-content/uploads/2022/03/logo-original-1000-ps_ccexpress.png",
          color: "info",
          arrow: 'mdi-arrow-up text-success',
          value: "",
          series:  [{ name: "Strategy Daily Volatility (%)", data: []}],
        },
      ],
      reportsBench : [
        {
          title: "LUNA Sharpe Ratio",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "warning",
          value: "",
          arrow: 'mdi-arrow-up text-success',
          series: [{ name: "LUNA Sharpe Ratio", data: []}],
        },
        {
          title: "LUNA Total Return (%)",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "primary",
          arrow: 'mdi-arrow-down text-danger',
          value: "",
          series:  [{ name: "LUNA Total Return (%)", data: []}],
        },
        {
          title: "LUNA Daily Volatility (%)",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "info",
          arrow: 'mdi-arrow-up text-success',
          value: "",
          series:  [{ name: "LUNA Daily Volatility (%)", data: []}],
        },
      ]
      
    }
    this.handleWeights= this.handleWeights.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleProRata = this.handleProRata.bind(this);
    this.sumWeights=this.sumWeights.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.groupByKey = this.groupByKey.bind(this);
  }


  //sumweights 
  sumWeights() {
    let weights = []
    const reducer = (accumulator, curr) => accumulator + curr;
    Object.keys(this.state.weights).forEach(key => {
      weights.push(this.state.weights[key])
      }
    ) 
    this.setState({sumweights:Math.round(weights.reduce(reducer))},
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

  //update weights
  handleProRata = (e) => {
    e.preventDefault()
    const assets = Object.keys(this.state.weights)
    console.log(assets.length)
    assets.forEach(x => {
    this.setState(prevState => ({
      weights: {
        ...prevState.weights,
        [x]: 100/assets.length
      },
    }), this.sumWeights)})

    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = (100/assets.length).toFixed(2))
    );

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
      data2:[],
      data:[],
      bench2:[],
      bench:[],
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
  
  groupByKey = (list, key) => list.reduce(
    (hash, obj) => ({...hash, [obj[key]]:( hash[obj[key]] || [] ).concat(obj.weighted_return)}), {})

  fetchData() {

    Object.keys(this.state.weights).forEach(name => {
    //set filters
    let filters = {
      ticker: name,
      from: this.state.dates[0],
      to: this.state.dates[1],
    }
    //assets
    historical.getHistoricalBacktester(filters)
      .then(apiData => {
        let formattedData = apiData
        .map(obj => {
            return {date: obj.timestamp, 
                    name:name,
                    weighted_return:(this.state.weights[name]/100)*obj['pct_change']}
                    
          })
        this.setState(prevState => ({
            data2: [].concat.apply([],[...prevState.data2, formattedData])}))
      }).then(x=>{
        
        const grouped = this.groupByKey(this.state.data2, 'date')
       
        //console.log(grouped)
        const dailyWeighted = Object.keys(grouped).map(day =>{
          return {date:day, weighted_return:grouped[day].reduce((a, b) => a + b, 0)}
        })

        //console.log(dailyWeighted)

        const one_dailyWeighted = Object.keys(dailyWeighted).map(day =>{
          return {date:dailyWeighted[day].date, weighted_return:1+dailyWeighted[day].weighted_return}
        }).sort(function (a, b) {
          var dateA = new Date(a.date), dateB = new Date(b.date)
          return dateA - dateB
        })
        //console.log(one_dailyWeighted)

        const equityCurve = []
        var i;
        x = 1
        for (i = 0; i < one_dailyWeighted.length; i++){
        x = x * one_dailyWeighted[i].weighted_return
        equityCurve.push({date: new Date(one_dailyWeighted[i].date), 'Strategy Return':x})
      }
              
      this.setState({data:equityCurve.sort(function (a, b) {
        var dateA = new Date(a.date), dateB = new Date(b.date)
        return dateA - dateB
      })})

      })

      ///benchmark
      historical.getHistoricalBacktester({
        ticker: "LUNA",
        from: this.state.dates[0],
        to: this.state.dates[1],
      }).then(apiData => {
        let formattedData2 = apiData
        .map(obj => {
            return {date: obj.timestamp, 
                    name:"LUNA",
                    weighted_return:obj['pct_change']
                  }
                    
          })
        this.setState(x => ({
            bench2: formattedData2}))
      }).then(x=>{
        
        const one_dailyWeighted = Object.keys(this.state.bench2).map(day =>{
          return {date:this.state.bench2[day].date, weighted_return:1+this.state.bench2[day].weighted_return}
        }).sort(function (a, b) {
          var dateA = new Date(a.date), dateB = new Date(b.date)
          return dateA - dateB
        })

        const equityCurve = []
        var i;
        x = 1
        for (i = 0; i < one_dailyWeighted.length; i++){
        x = x * one_dailyWeighted[i].weighted_return
        equityCurve.push({date: new Date(one_dailyWeighted[i].date), 'Luna Return':x})
      }
     
      this.setState({bench:equityCurve.sort(function (a, b) {
        var dateA = new Date(a.date), dateB = new Date(b.date)
        return dateA - dateB
      })})

      }).then(x=>{console.log('finished')})
  })
      
  }

  async handleSubmit(e) {
    e.preventDefault()
    this.fetchData()
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
                <button type="submit" onClick={this.handleProRata}>APPLY PRO RATA WEIGHTS</button>
                <div style={{paddingTop : "10px"}}>
                <button type="submit" onClick={this.handleSubmit}>BACKTEST</button>
                </div>
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
              <CartesianGrid strokeDasharray="3 3" />
                
                <XAxis 
                tickFormatter = {dateFormatter} 
                dataKey='date' type="category" 
                domain={['dataMin', 'dataMax']}
                xAxisId="btest"
                />

                <XAxis 
                tickFormatter = {dateFormatter} 
                dataKey='date' type="category" 
                domain={['dataMin', 'dataMax']}
                xAxisId="bench"
                hide="true"
                />

                <YAxis tickFormatter={pctFormatter} yAxisId="left" orientation="left" domain={['auto', 'auto']} />

                <Tooltip  labelFormatter={tick => {return dateFormatter(tick);}} formatter={tick => {return pctFormatter(tick);}}/>
                <Legend />

                <Line 
                 xAxisId="btest"
                 yAxisId="left"
                 data={this.state.data}
                 type="linear" 
                 dataKey="Strategy Return"
                 dot={false}
                 strokeWidth={4}
                 stroke="#8884d8"
                 />

                <Line 
                 xAxisId="bench"
                 yAxisId="left"
                 data={this.state.bench}
                 type="monotone" 
                 dataKey="Luna Return"
                 strokeDasharray="7 7"
                 strokeWidth={4}
                 stroke="#FFBF00"
                 />


             </LineChart>
             </ResponsiveContainer>
             </div>
          </CardBody>
        </Card>

        <Row>
        <MiniWidget reports={this.state.reports}/>
        </Row>
        <Row>
        <MiniWidget reports={this.state.reportsBench}/>     
        </Row>
        

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
}


export default DashboardNebulaBackTester
