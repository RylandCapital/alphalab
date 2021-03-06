import React, { Component } from "react"
import { Row, Col, Card } from "reactstrap"


class CardWelcome extends Component {
  render() {
    return (
      <React.Fragment>
        <Card>
          <div>
            <Row>
              <Col lg="9" sm="8">
                <div className="p-4">
                  <h5 className="text-primary">Farmers Market</h5>
                  <p>Welcome Alpha Astronaut!</p>

                  <div className="text-muted">
                    <p className="mb-1">
                      <i className="mdi mdi-circle-medium align-middle text-primary me-1"/>{" "}
                      Select Pool to Analyze
                    </p>
                    <p className="mb-1">
                      <i className="mdi mdi-circle-medium align-middle text-primary me-1"/>{" "}
                      Track Volume Flows and Compare DEX APRs
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-circle-medium align-middle text-primary me-1"/>{" "}
                      Locate Trading Opportunities
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-circle-medium align-middle text-primary me-1"/>{" "}
                      <a href='https://app.terraswap.io/'target="_blank" rel="noreferrer noopener"> <u>Terraswap</u></a> ,
                      <a href='https://app.astroport.fi/swap'target="_blank" rel="noreferrer noopener"> <u>Astroport Swap</u></a> ,
                      <a href='https://dex.loop.markets/swap#Swap'target="_blank" rel="noreferrer noopener"> <u>Loop Swap</u></a> ,
                      <a href='https://prismprotocol.app/swap'target="_blank" rel="noreferrer noopener"> <u>Prism Swap</u></a>
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg="3" sm="4" className="align-self-center">
                <div>
                  <img src="//alphadefi.fund/wp-content/uploads/2022/03/logo-original-1000-ps_ccexpress.png" alt="" className="img-fluid d-block" />
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </React.Fragment>
    )
  }
}

export default CardWelcome