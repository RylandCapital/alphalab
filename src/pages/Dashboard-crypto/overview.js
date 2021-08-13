import React, { Component } from "react"
import { Col, Card, CardBody, Button } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import historicalApi from '../../api/v1/historical'

class OverView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      series: [
        {
          name: 'mAAPL',
          data: [],
        },
      ],
      options: {
        chart: { toolbar: "false" },
        dataLabels: { enabled: !1 },
        stroke: { curve: "smooth", width: 2 },
        markers: { size: 0, style: "hollow" },
        xaxis: {
          type: "datetime",
          min: new Date("29 Apr 2021").getTime(),
          tickAmount: 6,
        },
        tooltip: { x: { format: "dd MMM yyyy" } },
        colors: ["#f1b44c"],
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.6,
            opacityTo: 0.05,
            stops: [42, 100, 100, 100],
          },
        },
        noData: {
          text: 'Loading...'
        },
      },
      activeM: false,
      active6M: false,
      activeY: true,
      activeA: false,
    }
    this.updateChartMonthly = this.updateChartMonthly.bind(this)
    this.updateChartSixMonth.bind(this)
    this.updateChartYearly.bind(this)
    this.updateChartAll.bind(this)
    this.updateChartApi = this.updateChartApi.bind(this)
  }

  updateChartApi() {
    let ticker = 'mAAPL'
    // TODO: should move this into the store...
    historicalApi.getHistoricalLongAprs(ticker).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.apr)
        .map(obj => [
          new Date(obj.date).getTime(),
          obj.apr
        ])
      this.setState(_ => ({
        series: [{
          name: ticker,
          data: formattedData,
        }],
      }))
    })
  }

  updateChartMonthly() {
    var d = new Date()
    var newxaxis = {
      min: d.setDate(d.getDate() - 30),
      max: d.getTime(),
    }
    var newyaxis = { forceNiceScale: true }
    this.setState(prevState => ({
      options: {
        ...prevState.options,
        xaxis: newxaxis,
        yaxis: newyaxis
      },
    }))
    this.setState({
      activeM: true,
      active6M: false,
      activeY: false,
      activeA: false,
    })
  }

  updateChartSixMonth() {
    var newxaxis = {
      min: new Date("27 Sep 2012").getTime(),
      max: new Date("27 Feb 2013").getTime(),
    }
    this.setState(prevState => ({
      options: {
        ...prevState.options,
        xaxis: newxaxis,
      },
    }))
    this.setState({
      activeM: false,
      active6M: true,
      activeY: false,
      activeA: false,
    })
  }

  updateChartYearly() {
    var newxaxis = {
      min: new Date("27 Feb 2012").getTime(),
      max: new Date("27 Feb 2013").getTime(),
    }
    this.setState(prevState => ({
      options: {
        ...prevState.options,
        xaxis: newxaxis,
      },
    }))
    this.setState({
      activeM: false,
      active6M: false,
      activeY: true,
      activeA: false,
    })
  }

  updateChartAll() {
    var newxaxis = { min: void 0, max: void 0 }
    this.setState(prevState => ({
      options: {
        ...prevState.options,
        xaxis: newxaxis,
      },
    }))
    this.setState({
      activeM: false,
      active6M: false,
      activeY: false,
      activeA: true,
    })
  }

  componentDidMount() {
    this.updateChartApi()
  }

  render() {
    return (
      <React.Fragment>
        <Col xl="10">
          <Card>
            <CardBody>
              <h4 className="card-title mb-3">Tracker</h4>

              <div>
                <div id="overview-chart" className="apex-charts" dir="ltr">
                  <div className="toolbar button-items text-center">
                    <Button
                      color="light"
                      size="sm"
                      type="button"
                      className={this.state.activeM ? "active" : ""}
                      onClick={() => this.updateChartMonthly()}
                      id="one_month"
                    >
                      1M
                    </Button>{" "}
                    <Button
                      color="light"
                      size="sm"
                      type="button"
                      className={this.state.active6M ? "active" : ""}
                      onClick={() => this.updateChartSixMonth()}
                      id="six_months"
                    >
                      6M
                    </Button>{" "}
                    <Button
                      color="light"
                      size="sm"
                      type="button"
                      className={this.state.activeY ? "active" : ""}
                      onClick={() => this.updateChartYearly()}
                      id="one_year"
                    >
                      1Y
                    </Button>{" "}
                    <Button
                      color="light"
                      size="sm"
                      type="button"
                      className={this.state.activeA ? "active" : ""}
                      onClick={() => this.updateChartAll()}
                      id="all"
                    >
                      ALL
                    </Button>
                  </div>
                  <div id="overview-chart-timeline">
                    <ReactApexChart
                      options={this.state.options}
                      series={this.state.series}
                      type="area"
                      height={500}
                      
                    />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    )
  }
}

export default OverView