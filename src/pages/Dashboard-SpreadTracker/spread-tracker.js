import React from "react";
import Select from "react-select";
import { Col, FormGroup, Label, Card, CardBody } from "reactstrap";
import tokenDictApi from "../../api/v1/token-dictionary";
import mirrorGraphql from "../../api/v1/mirror-graphql";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function pctFormatter(params) {
  return Number(params.value * 100).toFixed(2) + "%";
}


function formatXAxis(tickItem) {
  var date = new Date(tickItem);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();

  return hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
}

function formatYAxis(tickItem) {
  
  return (tickItem)+'%';
}

const fetchStats = () => {
  return fetch("https://api.alphadefi.fund/historical/spreadhiststats");
};

class SpreadTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priceData: [],
      oracleData: [],
      spreadData: [],
      tickerOptions: [],
      defaultOption: { label: "mSPY", value: "mSPY" },
      selectedTicker: "mSPY",
      tokenAddresses: {},
      rowData: [],
    };
    this.timer = null;
    this.timer2 = null;
    this.clearTimer = this.clearTimer.bind(this);
    this.scheduleFetch = this.scheduleFetch.bind(this);
    this.fetchSpreadData = this.fetchSpreadData.bind(this);
    this.fetchTickers = this.fetchTickers.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData() {
    const response = await fetchStats();
    const data = await response.json();

    console.log(data);
    this.setState({ rowData: data });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    console.log(">> onGridReady");
    this.fetchData();
    this.gridApi.sizeColumnsToFit();
  }

  fetchTickers() {
    tokenDictApi.getTokenDict().then(apiData => {
      let tokenObj = apiData[0] ? apiData[0].token : {};
      this.setState(
        {
          tickerOptions: Object.keys(tokenObj).map(ticker => {
            return { value: ticker, label: ticker };
          }),
          tokenAddresses: tokenObj,
        },
        () => this.fetchSpreadData()
      );
    });
  }

  fetchSpreadData() {
    if (this.state.selectedTicker.length === 0) {
      return;
    }
    let currentTime = new Date().getTime();
    console.log(currentTime - 87400000);
    console.log(currentTime - 300000);
    let filters = {
      from: currentTime - 30000000,
      to: currentTime,
      interval: 1,
      token: this.state.tokenAddresses[this.state.selectedTicker],
    };
    mirrorGraphql.getSpreadData(filters).then(data => {
      console.log(data);
      let formattedPriceData = data.asset.prices.history.map(obj => {
        return { xaxis1: obj.timestamp, Price: Number(obj.price).toFixed(2) };
      });
      let formattedOracleData = data.asset.prices.oracleHistory.map(obj => {
        return {
          xaxis2: obj.timestamp,
          oraclePrice: Number(obj.price).toFixed(2),
        };
      });
      let formattedSpreadData = data.asset.prices.history
        .map((item, index) => {
          return {
            spread: (
              (Number(item["price"]) -
                Number(data.asset.prices.oracleHistory[index]["price"])) /
              Number(data.asset.prices.oracleHistory[index]["price"])
            ),
            timestamp: item["timestamp"],
          };
        })
        .map(obj => {
          return {
            xaxis3: obj.timestamp,
            Spread: Number((obj.spread*100).toFixed(4)),
          };
        });
      this.setState({
        priceData: formattedPriceData,
        oracleData: formattedOracleData,
        spreadData: formattedSpreadData,
      });
      this.scheduleFetch();
    });
  }

  handleChange(selectedOption) {
    this.clearTimer();
    this.setState(
      {
        selectedTicker: selectedOption.value,
      },
      () => this.fetchSpreadData()
    );
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      clearTimeout(this.timer2);
      this.timer = null;
      this.timer2 = null;
    }
  }

  scheduleFetch() {
    this.clearTimer();
    this.timer = setTimeout(this.fetchSpreadData, 25000);
    this.timer2 = setTimeout(this.fetchData, 100000);
  }

  componentDidMount() {
    // load latest month by default
    this.fetchTickers();
  }

  pctFormatter(params) {
    return "%" + params.value * 100;
  }

  render() {
    return (
      <React.Fragment>
        <Col xl="12">
          <Card>
            <CardBody className="card-body-test">
              <FormGroup className="w-25 select2-container mb-3">
                <Label className="control-label">Assets</Label>
                <Select
                  classNamePrefix="form-control"
                  placeholder="TYPE or CHOOSE ..."
                  title="mAsset"
                  options={this.state.tickerOptions}
                  defaultValue={this.state.defaultOption}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <div style={{ height: 600 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={2000}
                    height={600}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="xaxis1"
                      xAxisId={1}
                      type="number"
                      domain={["dataMin", "dataMax"]}
                      tickFormatter={formatXAxis}
                    />
                    <XAxis
                      dataKey="xaxis2"
                      xAxisId={2}
                      type="number"
                      domain={["dataMin", "dataMax"]}
                      axisLine="false"
                      tickLine="False"
                      hide="true"
                    />
                    <XAxis
                      dataKey="xaxis3"
                      xAxisId={3}
                      type="number"
                      domain={["dataMin", "dataMax"]}
                      axisLine="false"
                      tickLine="False"
                      hide="true"
                    />
                    <YAxis yAxisId={1} domain={["auto", "auto"]} />
                    <YAxis
                      yAxisId={2}
                      domain={["auto", "auto"]}
                      orientation="right"
                      tickFormatter={formatYAxis}
                      
                    />
                    <Tooltip
                      labelFormatter={tick => {
                        return formatXAxis(tick);
                      }}
                    />
                    <Legend />
                    <Line
                      data={this.state.priceData}
                      yAxisId={1}
                      xAxisId={1}
                      type="linear"
                      dataKey="Price"
                      stroke="#8884d8"
                    />
                    <Line
                      data={this.state.oracleData}
                      yAxisId={1}
                      xAxisId={2}
                      type="linear"
                      dataKey="oraclePrice"
                      stroke="#82ca9d"
                    />
                    <Line
                      data={this.state.spreadData}
                      yAxisId={2}
                      xAxisId={3}
                      type="basis"
                      dataKey="Spread"
                      dot={false}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="ag-theme-alpine" style={{ height: 400 }}>
                <Label className="control-label">
                  30 Day Rolling Spread Statistics
                </Label>
                <AgGridReact
                  onGridReady={this.onGridReady.bind(this)}
                  rowData={this.state.rowData}
                >
                  <AgGridColumn
                    field="symbol"
                    sortable={true}
                    filter={true}
                    resizable={true}
                    headerTooltip="Symbol"
                  ></AgGridColumn>
                  <AgGridColumn
                    field="Current (1Min Updated)"
                    sortable={true}
                    filter={true}
                    valueFormatter={pctFormatter}
                    resizable={true}
                  ></AgGridColumn>
                  <AgGridColumn
                    field="mean"
                    sortable={true}
                    filter={true}
                    valueFormatter={pctFormatter}
                    resizable={true}
                    headerTooltip="mean historical spread, normally the spread this asset trades at"
                  ></AgGridColumn>
                  <AgGridColumn
                    field="Three SD"
                    sortable={true}
                    filter={true}
                    valueFormatter={pctFormatter}
                    resizable={true}
                    headerTooltip="+ three standard deviations from mean, anything above this could be a sell"
                  ></AgGridColumn>
                  <AgGridColumn
                    field="Neg Three SD"
                    sortable={true}
                    filter={true}
                    valueFormatter={pctFormatter}
                    resizable={true}
                    headerTooltip="- three standard deviations from mean, anything below this could be a buy"
                  ></AgGridColumn>
                  <AgGridColumn
                    field="max"
                    sortable={true}
                    filter={true}
                    valueFormatter={pctFormatter}
                    resizable={true}
                    headerTooltip="max spread last 21 days"
                  ></AgGridColumn>
                  <AgGridColumn
                    field="min"
                    sortable={true}
                    filter={true}
                    valueFormatter={pctFormatter}
                    resizable={true}
                    headerTooltip="min spread last 21 days"
                  ></AgGridColumn>
                  <AgGridColumn
                    field="std"
                    sortable={true}
                    filter={true}
                    valueFormatter={pctFormatter}
                    resizable={true}
                    headerTooltip="std of historical spread"
                  ></AgGridColumn>
                  <AgGridColumn
                    field="Historical 5th % Spread"
                    sortable={true}
                    filter={true}
                    valueFormatter={pctFormatter}
                    resizable={true}
                    headerTooltip="Historical 5th % Spread"
                  ></AgGridColumn>
                  <AgGridColumn
                    field="Historical 95th % Spread"
                    sortable={true}
                    filter={true}
                    valueFormatter={pctFormatter}
                    resizable={true}
                    headerTooltip="Historical 95th % Spread"
                  ></AgGridColumn>
                </AgGridReact>
              </div>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    );
  }
}

export default SpreadTracker;
