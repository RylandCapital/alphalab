import React from "react"
import { Col } from "reactstrap"
import historical from '../../api/v1/historical'
import dayjs from 'dayjs'
import poolDictApi from '../../api/v1/pool-dictionary'
import LineChart from '../../components/Charts/LineChart';
import { mixedFormatter } from '../../components/utils';

class StakingDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      tickerOptions: [],
      tokenAddresses: {},
      rowData: [],
      selectedShortTicker: 'Anchor_bLuna_APR',
      defaultOption: { label: 'Anchor_bLuna_APR', value: 'Anchor_bLuna_APR' },
      longDates: [dayjs().subtract(6, 'month').toDate(), dayjs().toDate()],
    }
    this.fetchAPRData = this.fetchAPRData.bind(this)
    this.fetchTickers = this.fetchTickers.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)
  }

  fetchTickers() {
    poolDictApi.getLiqStakingDict().then(apiData => {
      let tokenObj = apiData[0] ? apiData[0].token : {}
      this.setState({
        tickerOptions: Object.keys(tokenObj).map(ticker => {
          return { value: ticker, label: ticker }
        }),
        tokenAddresses: tokenObj,
      }, () => this.fetchAPRData())
    })
  }

  fetchAPRData() {
    if (this.state.selectedShortTicker.length === 0) {
      return
    }
    let precision = 'day'
    let diff = Math.abs(dayjs(this.state.longDates[0]).diff(dayjs(this.state.longDates[1])))
    // 604800000 = 7 days
    if (diff < 604800000) {
      precision = 'hour'
    }
    let filters = {
      token: this.state.tokenAddresses[this.state.selectedShortTicker],
      ticker: this.state.selectedShortTicker,
      from: this.state.longDates[0],
      to: this.state.longDates[1],
      precision: precision,
    }
    historical.getHistoricalLiquidStaking(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.value)
        .map(obj => {
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY'), value: obj.value}
        })
      this.setState(_ => ({
        data: formattedData,
      }))
      console.log(this.state.data)
    })
  }

  handleChange(selectedOption) {
    console.log(selectedOption.value)
    this.setState({
      selectedShortTicker: selectedOption.value
    }, () => this.fetchAPRData())
  }

  handleStartDateChange(date) {
    let newDates = [date, this.state.longDates[1]]
    this.setState({
      longDates: newDates,
    }, () => this.fetchAPRData())
  }

  handleEndDateChange(date) {
    let newDates = [this.state.longDates[0], date]
    this.setState({
      longDates: newDates,
    }, () => this.fetchAPRData())
  }

  componentDidMount() {
    // load latest month by default
    this.fetchTickers()
  }

  render() {
    return (
      <Col xl="12">
        <LineChart
          data={this.state.data}
          defaultOption={this.state.defaultOption}
          asset={this.state.tickerOptions.find(o => o.value === this.state.selectedShortTicker)}
          onAssetChange={this.handleChange}
          startDate={this.state.longDates[0]}
          onStartDateChange={this.handleStartDateChange}
          endDate={this.state.longDates[1]}
          onEndDateChange={this.handleEndDateChange}
          tickers={this.state.tickerOptions}
          title="Luna Staking Historical Timeseries"
          yAxisKey="value"
          yAxisFormatter={mixedFormatter}
        />
      </Col>
    )
  }
}

export default StakingDashboard
