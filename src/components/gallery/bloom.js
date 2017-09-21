import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';

const ButtonToRegionList = ({ title, history }) => (
    <Button bsStyle="" className="button" onClick={() => history.push('/signups')}>Sign Up</Button>
  );

export default class GalleryBloom extends Component {

  constructor() {
    super();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const selectRegion = this.props.selectRegion;

    return (
      <div className="no-padding gallery-container">
        <Grid>
            <Row>
            <Col sm={12} className="small-screen-hide">
                <h2 className="gallery-title">Gallery</h2>
            </Col>
            </Row>
        </Grid>
        <Grid>
            <Row className="show-grid gallery-nav">
                <div className="horizontal-line small-screen-hide"></div>
                <Col xs={12} className="nav-margin">
                        <Link to="/gallery-simple"><div>Simple </div></Link>
                        <i className="fa fa-circle gallery-nav-separator"></i>
                        <Link to="/gallery-elegant"><div> Elegant </div></Link>
                        <i className="fa fa-circle gallery-nav-separator"></i>
                        <div className="flow-selected"> Bloom</div>
                </Col>
                <div className="horizontal-line small-screen-hide"></div>
            </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-b1 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-b2 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-b3 gallery-pic">
              </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-b4 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-b5 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-b6 gallery-pic">
              </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="show-grid gallery-pic-container">
              <Col sm={4} className="gallery-pic-b7 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-b8 gallery-pic">
              </Col>
              <Col sm={4} className="gallery-pic-b9 gallery-pic">
              </Col>
          </Row>
        </Grid>
        <div className="home-about">
            <Grid>
                <Row>
                    <h2> Note on <span className="home-company-name">Bloom</span></h2>
                    <Col sm={1}></Col>
                    <Col sm={10}>
                    <div className="plan-text">
                        <ul>
                        <li>For HKD223 per week, this plan is a weekly flower design and delivery service prepared by our florists.</li>
                        <li>While each week's design is different, Bloom most often consists of 5-10 major blooms, supported by minor flowers.</li>
                        <li>Office locations receive wrapped arrangement, while home and cemetary locations receive vase arrangement.</li>
                        <li>For vase arrangement, please provide your vase in an open area for our florist to access. For home locations, please put your vase in front of your door if no one is at home.</li>
                        <li>For the Bloom plan, the ideal vase height is 12-17cm and the ideal vase opening's diameter is 3-4cm.</li>
                        <li>To make our service affordable to flower lovers, we begin to invite customers to subscribe when 150 customers have shown interest in an area. Check out if we are servicing your area now!</li>
                        </ul>
                    </div>
                    </Col>
                    <Col sm={1}></Col>
                </Row>
                <Route path="/" render={(props) => <ButtonToRegionList {...props}/>} />
            </Grid>
        </div>
      </div>
    )
  }
}
