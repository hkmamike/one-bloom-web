import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default class Footer extends Component {
 render() {
    return (
      <footer>

        <div className="bar-pink">
          JOIN THE ONEBLOOM MOVEMENT NOW <u><i className="fi fi-torsos-all"></i></u>
        </div>

        <div className="footer-contact">
          <Grid>
            <Row className="show-grid">
              <Col xsHidden sm={4}>
                <div className="footer-title">Company</div>
                <ul className="foote-list">
                  <li>About</li>
                  <li>Careers</li>
                  <li>Contact Us</li>
                </ul>
              </Col>
              <Col xs={6} sm={4}>
                <div className="footer-title">Support</div>
                <ul className="foote-list">
                  <li>FAQ</li>
                  <li>Contact Us</li>
                </ul>
              </Col>
              <Col xs={6} sm={4}>
                <div className="footer-title">Terms</div>
                <ul className="foote-list">
                  <li>Terms of Services</li>
                  <li>Privacy Policy</li>
                </ul>
              </Col>
            </Row>
          </Grid>
        </div>

        <div className="footer-end">
          <div className="footer-social">
              <i className="fi fi-social-facebook"></i>
              <i className="fi fi-social-twitter"></i>
              <i className="fi fi-social-instagram"></i>
              <i className="fi fi-social-linkedin"></i>
          </div>
          &copy; <span className="footer-company-name">One Bloom Co.</span> 2017.
        </div>
          
      </footer>
    )
  }
}