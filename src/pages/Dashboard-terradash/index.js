import React, { Component } from "react"
import { Container, Row, Col } from "reactstrap"
import MetaTags from 'react-meta-tags';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import CardWelcome from "./card-welcome"
import MiniWidget from "./mini-widget"
import AprTrackerShort from './apr-tracker-short'
import mirrorGraphql from '../../api/v1/mirror-graphql'
import historical from '../../api/v1/historical'

import dayjs from 'dayjs'

const options1 = {
  chart: { sparkline: { enabled: !0 } },
  stroke: { curve: "smooth", width: 2 },
  colors: ["#f1b44c"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: !1,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [25, 100, 100, 100],
    },
  },
  tooltip: { fixed: { enabled: !1 }, x: { show: !1 }, marker: { show: !1 } },
}

const options2 = {
  chart: { sparkline: { enabled: !0 } },
  stroke: { curve: "smooth", width: 2 },
  colors: ["#3452e1"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: !1,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [25, 100, 100, 100],
    },
  },
  tooltip: { fixed: { enabled: !1 }, x: { show: !1 }, marker: { show: !1 } },
}

const options3 = {
  chart: { sparkline: { enabled: !0 } },
  stroke: { curve: "smooth", width: 2 },
  colors: ["#50a5f1"],
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: !1,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [25, 100, 100, 100],
    },
  },
  tooltip: { fixed: { enabled: !1 }, x: { show: !1 }, marker: { show: !1 } },
}

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      selectedLongTicker: '',
      reports: [
        {
          title: "UST Market Cap ($)",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/UST.png",
          color: "warning",
          value: "",
          arrow: 'mdi-arrow-up text-success',
          series: [{ name: "UST Market Cap ($)", data: []}],
          options: options1,
        },
        {
          title: "UST Market Cap 7 Day Percent Change (%)",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/UST.png",
          color: "primary",
          arrow: 'mdi-arrow-down text-danger',
          value: "",
          series:  [{ name: "UST Market Cap 7 Day Percent Change (%)", data: []}],
          options: options2,
        },
        {
          title: "UST Market Cap 1 Month Percent Change (%)",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/UST.png",
          color: "info",
          arrow: 'mdi-arrow-up text-success',
          value: "",
          series:  [{ name: "UST Market Cap 1 Month Percent Change (%)", data: []}],
          options: options3,
        },
      ],
      reports2: [
        {
          title: "LUNA UST Market Cap Ratio",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "warning",
          value: "",
          arrow: 'mdi-arrow-up text-success',
          series: [{ name: "LUNA UST Market Cap Ratio", data: []}],
          options: options1,
        },
        {
          title: "LUNA UST Market Cap Ratio Rank",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "primary",
          arrow: 'mdi-arrow-down text-danger',
          value: "",
          series:  [{ name: "LUNA UST Market Cap Ratio Rank", data: []}],
          options: options2,
        },
        {
          title: "LUNA Staking Return Annualized",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "info",
          arrow: 'mdi-arrow-up text-success',
          value: "",
          series:  [{ name: "LUNA Staking Return Annualized", data: []}],
          options: options3,
        },
      ],
      reports3: [
        {
          title: "UST Market Cap 1 Month Percent Change",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/UST.png",
          color: "warning",
          value: "",
          arrow: 'mdi-arrow-up text-success',
          series: [{ name: "UST Market Cap 1 Month Percent Change", data: []}],
          options: options1,
        },
        {
          title: "LUNA 1 Week Return",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "primary",
          arrow: 'mdi-arrow-down text-danger',
          value: "",
          series:  [{ name: "LUNA 1 Week Return Percentile Rank", data: []}],
          options: options2,
        },
        {
          title: "LUNA 1 Month Return",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "info",
          arrow: 'mdi-arrow-up text-success',
          value: "",
          series:  [{ name: "LUNA 1 Month Return", data: []}],
          options: options3,
        },
      ],
      reports4: [
        {
          title: "AlphaDefi Terra Health Indicator",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "warning",
          value: "",
          arrow: 'mdi-arrow-up text-success',
          series: [{ name: "AlphaDefi Terra Health Indicator", data: []}],
          options: options1,
        },
        {
          title: "Daily Registered Accounts 10 Day Moving Average",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/UST.png",
          color: "primary",
          arrow: 'mdi-arrow-down text-danger',
          value: "",
          series:  [{ name: "Daily Registered Accounts 10 Day Moving Average", data: []}],
          options: options2,
        },
        {
          title: "Daily UST Transaction Volume 10 Day Moving Average",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/UST.png",
          color: "info",
          arrow: 'mdi-arrow-up text-success',
          value: "",
          series:  [{ name: "Daily UST Transaction Volume 10 Day Moving Average", data: []}],
          options: options3,
        },
      ],
      reports5: [
        {
          title: "LUNA - BTC Market Cap Ratio",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "warning",
          value: "",
          arrow: 'mdi-arrow-up text-success',
          series: [{ name: "LUNA - BTC Market Cap Ratio", data: []}],
          options: options1,
        },
        {
          title: "LUNA - ETH Market Cap Ratio",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "primary",
          arrow: 'mdi-arrow-down text-danger',
          value: "",
          series:  [{ name: "LUNA - ETH Market Cap Ratio", data: []}],
          options: options2,
        },
        {
          title: "LUNA - SOL Market Cap Ratio",
          icon: "mdi mdi-email-open",
          imageUrl: "//whitelist.mirror.finance/images/Luna.png",
          color: "info",
          arrow: 'mdi-arrow-up text-success',
          value: "",
          series:  [{ name: "LUNA - SOL Market Cap Ratio", data: []}],
          options: options3,
        },
      ],
    }
    this.fetchAprData1= this.fetchAprData1.bind(this)
  }

fetchAprData1() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'UST Market Cap ($)',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        console.log(formattedData)
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports[0].value = Number(formattedData[formattedData.length-1].Price).toLocaleString('en-US', {maximumFractionDigits:2})
        this.setState(newState2)
    })
  }

  fetchAprData12() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'LUNA UST Market Cap Ratio',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        console.log(formattedData)
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports2[0].value = Number(formattedData[formattedData.length-1].Price*1000000000).toLocaleString('en-US', {maximumFractionDigits:2})+' e-9'
        this.setState(newState2)
    })
  }

  fetchAprData13() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'UST Market Cap 1 Month Percent Change',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      console.log(apiData)
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        console.log(formattedData)
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports3[0].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
        this.setState(newState2)
    })
  }

  fetchAprData14() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'Terra Health Score',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      console.log(apiData)
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        console.log(formattedData)
        let newState2 = JSON.parse(JSON.stringify(this.state))
      
        newState2.reports4[0].value = Number(formattedData[formattedData.length-1].Price).toLocaleString('en-US', {maximumFractionDigits:2}) 
        this.setState(newState2)
    })
  }

  fetchAprData15() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'LUNA - BTC Market Cap Ratio',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      console.log(apiData)
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        console.log(formattedData)
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports5[0].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
        this.setState(newState2)
    })
  }

  fetchAprData2() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'UST Market Cap 7 Day Percent Change',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports[1].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
        this.setState(newState2)
    })
  }

  fetchAprData22() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'LUNA UST Market Cap Ratio Rank',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports2[1].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
        this.setState(newState2)
    })
  }

  fetchAprData23() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'LUNA 1 Week Return',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports3[1].value = Number(formattedData[formattedData.length-1].Price).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
        this.setState(newState2)
    })
  }

  fetchAprData24() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'Daily Registered Accounts 10 Day Moving Average',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports4[1].value = Number(formattedData[formattedData.length-1].Price).toLocaleString('en-US', {maximumFractionDigits:2})
        this.setState(newState2)
    })
  }

  fetchAprData25() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'LUNA - ETH Market Cap Ratio',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports5[1].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
        this.setState(newState2)
    })
  }

  fetchAprData3() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'UST Market Cap 1 Month Percent Change',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports[2].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
        this.setState(newState2)
    })
  }

  fetchAprData32() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'LUNA Staking Return Annualized',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports2[2].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
        this.setState(newState2)
    })
  }

  fetchAprData33() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'LUNA 1 Month Return',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports3[2].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
        this.setState(newState2)
    })
  }

  fetchAprData34() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'Daily UST Transaction Volume 10 Day Moving Average',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports4[2].value = Number(formattedData[formattedData.length-1].Price).toLocaleString('en-US', {maximumFractionDigits:2})+' UST'
        this.setState(newState2)
    })
  }

  fetchAprData35() {

    let precision = 'day'
    let diff = 605800000
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      ticker: 'LUNA - SOL Market Cap Ratio',
      precision: precision,
    }
    historical.getHistoricalTerraDash(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), Price: obj.value}
        })
        let newState2 = JSON.parse(JSON.stringify(this.state))
        newState2.reports5[2].value = Number(formattedData[formattedData.length-1].Price*100).toLocaleString('en-US', {maximumFractionDigits:2})+'%'
        this.setState(newState2)
    })
  }


  componentDidMount() {
    this.fetchAprData1()
    this.fetchAprData12()
    this.fetchAprData13()
    this.fetchAprData14()
    this.fetchAprData15()
    this.fetchAprData2()
    this.fetchAprData22()
    this.fetchAprData23()
    this.fetchAprData24()
    this.fetchAprData25()
    this.fetchAprData3()
    this.fetchAprData32()
    this.fetchAprData33()
    this.fetchAprData34()
    this.fetchAprData35()
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          {/*<MetaTags>
            <title>Crypto Dashboard | Skote - React Admin & Dashboard Template</title>
          </MetaTags>*/}
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs title="ALPHALABS" breadcrumbItem="TERRA CORE" />
            <Row>
              {/* card user */}
              {/*<CardUser />*/}

              <Col xl="12">
                {/* card welcome */}
                <CardWelcome />
                <Row>
                  {/* mini widgets */}
                  <MiniWidget reports={this.state.reports4} />
                </Row>
                <Row>
                  {/* mini widgets */}
                  <MiniWidget reports={this.state.reports5} />
                </Row>
                <Row>
                  {/* mini widgets */}
                  <MiniWidget reports={this.state.reports} />
                </Row>
                <Row>
                  {/* mini widgets */}
                  <MiniWidget reports={this.state.reports2} />
                </Row>
                <Row>
                  {/* mini widgets */}
                  <MiniWidget reports={this.state.reports3} />
                </Row>
              </Col>
            </Row>

            <Row>
              {/* wallet balance
              <WalletBalance />*/}

              {/* overview
              <OverView />*/}
            </Row>

            <Row >
            <AprTrackerShort />
            </Row>

            {/*<Row>
               transactions
              <Transactions />

              {/* notifications
              <Notifications />

               buy sell
              <BuySell />
            </Row>*/}
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard
