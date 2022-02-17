import React from "react"
import {
  Col,
  Label,
  Card,
  CardBody,
  FormGroup
} from "reactstrap"
import poolDictApi from '../../api/v1/pool-dictionary'
import historical from '../../api/v1/historical'
import {AgGridColumn, AgGridReact} from 'ag-grid-react'
import LineChart from '../../components/Charts/LineChart';
import Select from 'react-select';

//Import Date Picker
import "react-datepicker/dist/react-datepicker.css"


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import dayjs from 'dayjs'

function pctFormatter(params) {
  return Number(params.value).toFixed(2) + '%';
}

function pctFormatter2(params) {
  return (Number(params)*100).toFixed(4)+'%'
}

const fetchStats = () => {
  return fetch(
    "https://api.alphadefi.fund/info/aprcompare"
  );
};

class AprTrackerShort extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      dex:'Terraswap',
      dexs:[{ value: 'Terraswap', label: 'Terraswap' },
        { value: 'Astroport', label: 'Astroport' },
        { value: 'Loop', label: 'Loop' }],
      tickerOptions: [],
      tokenAddresses: {},
      rowData: [],
      rowData2: [],
      selectedPool: 'luna-ust',
      defaultOption: { label: 'luna-ust', value: 'luna-ust' },
      longDates: [dayjs().subtract(6, 'month').toDate(), dayjs().toDate()],
    }
    this.fetchAprData = this.fetchAprData.bind(this)
    this.fetchTickers = this.fetchTickers.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeDex = this.handleChangeDex.bind(this)
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleEndDateChange = this.handleEndDateChange.bind(this)

    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData() {
    const response = await fetchStats();
    const data = await response.json();
    console.log(data)
    this.setState({ rowData: data });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    console.log(">> onGridReady");
    this.fetchData();
    this.gridApi.sizeColumnsToFit();

  }

  fetchTickers(dex) {
    poolDictApi.getDexPoolDict().then(apiData => {
      let tokenObj = apiData[0] ? apiData[0].dex: {}
      this.setState({
        tickerOptions: Object.keys(tokenObj[dex]).map(ticker => {
          console.log(tokenObj[dex][ticker])
          return { value: tokenObj[dex][ticker] , label:  tokenObj[dex][ticker] }
        }),
        
      }, () => this.fetchAprData())
    })
  }


  fetchAprData() {
    if (this.state.selectedPool.length === 0) {
      return
    }
    let filters = {
      dex: this.state.dex,
      ticker: this.state.selectedPool,
      from: this.state.longDates[0],
      to: this.state.longDates[1],
    }
    historical.getHistoricalAprs(filters).then(apiData => {
      let formattedData = apiData
        .filter(obj => obj.apr7d)
        .map(obj => {
          console.log(obj.date)
          return {xaxis1: dayjs(obj.date).format('MM/DD/YYYY HH:mm:ss'), APR: obj.apr7d}
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
      selectedPool: selectedOption.value
    }, () => this.fetchAprData())
  }

  handleChangeDex(selectedOption) {
    console.log(selectedOption.value)
    this.setState({
      dex: selectedOption.value,
      selectedPool: 'luna-ust'
    }, () => this.fetchTickers(selectedOption.value))

  }

  handleStartDateChange(date) {
    let newDates = [date, this.state.longDates[1]]
    this.setState({
      longDates: newDates,
    }, () => this.fetchAprData())
  }

  handleEndDateChange(date) {
    let newDates = [this.state.longDates[0], date]
    this.setState({
      longDates: newDates,
    }, () => this.fetchAprData())
  }

  componentDidMount() {
    // load latest month apr data by default
    this.fetchTickers('Terraswap')

  }

  render() {
    return (
      <React.Fragment>
        <Col xl="12">
        <Card>
        <CardBody className="card-body-test">
        <FormGroup className="w-25 select2-container mb-3 d-inline-block me-2">
        <Label className="control-label">CHOOSE DEX</Label>
        
                  <Select
                     classNamePrefix="form-control"
                     placeholder="Terraswap"
                     options={this.state.dexs}
                     defaultValue={'Terraswap'}
                     onChange={this.handleChangeDex}
                  />
        </FormGroup>
        </CardBody>
        </Card>
        <Card >
            <CardBody className="card-body-test">
              <Col xl="12">
              <LineChart
                data={this.state.data}
                defaultOption={this.state.defaultOption}
                asset={this.state.tickerOptions.find(o => o.value === this.state.selectedPool)}
                onAssetChange={this.handleChange}
                startDate={this.state.longDates[0]}
                onStartDateChange={this.handleStartDateChange}
                endDate={this.state.longDates[1]}
                onEndDateChange={this.handleEndDateChange}
                tickers={this.state.tickerOptions}
                title="TRADING APRS BY DEX"
                yAxisKey="APR"
                yAxisFormatter={pctFormatter2}
              />
              </Col>
            </CardBody>
          </Card>
          <Card>
          <CardBody>
            <div className="ag-theme-alpine" style={{height: 800}}>
            <Label className="control-label">Compare APRs for any Pool offered on 2 or more DEXs</Label>
            <AgGridReact
               onGridReady={this.onGridReady.bind(this)}
               rowData={this.state.rowData}>
                <AgGridColumn field="Symbol" sortable={true} filter={true} resizable={true} headerTooltip='Pool Name'></AgGridColumn>
                <AgGridColumn field="Terraswap" sortable={true} filter={true} valueFormatter={pctFormatter} resizable={true}  headerTooltip='TerraSwap Trading APR'></AgGridColumn>
                <AgGridColumn field="Astroport" sortable={true} filter={true} valueFormatter={pctFormatter} resizable={true}  headerTooltip='AstroPort Trading APR'></AgGridColumn>
                <AgGridColumn field="Loop" sortable={true} filter={true} valueFormatter={pctFormatter} resizable={true}  headerTooltip='Loop Trading APR'></AgGridColumn>
                <AgGridColumn field="Terraswap Volume Dominance" sortable={true} filter={true} valueFormatter={pctFormatter} resizable={true}  headerTooltip='% Total Volume from TerraSwap'></AgGridColumn>
                <AgGridColumn field="Astroport Volume Dominance" sortable={true} filter={true} valueFormatter={pctFormatter} resizable={true}  headerTooltip='% Total Volume from Astroport'></AgGridColumn>
                <AgGridColumn field="Loop Volume Dominance" sortable={true} filter={true} valueFormatter={pctFormatter} resizable={true}  headerTooltip='% Total Volume from Loop'></AgGridColumn>
            </AgGridReact>
            <Label className="control-label">***0.00% indicates pool is not offered on that DEX</Label>
            </div>
          </CardBody>
          </Card>
          
        </Col>
      </React.Fragment>
    )
  }
}

export default AprTrackerShort
