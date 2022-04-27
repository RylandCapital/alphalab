import React from 'react';
import PropTypes from 'prop-types';
import { Col, Card, CardBody, Form, Label, Row } from 'reactstrap';


const MiniWidget = (props) => (
  <>
    {props.reports.map((report, key) => (
    <Col sm="4" key={key}>
      <Row>
      <Card>
        <CardBody>
        <div >
            <div style={{paddingLeft : "10px"}}>
            <Form>
              <Label>     
              <label style={{paddingRight : "10px"}}>{report.title}</label>   
              <input type="text" name={report.title} onChange={props.action} placeholder="Enter Asset Weight…"/>
              </Label>
            </Form>
            </div>
        </div>
        </CardBody>
      </Card>
      </Row>
    </Col>
    )
  )
}
  </>
);

MiniWidget.propTypes = {
  reports: PropTypes.array,
  action: PropTypes.func,
};

export default MiniWidget;
