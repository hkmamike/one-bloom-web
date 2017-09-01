import React, { Component } from 'react'
import * as firebase from 'firebase';
import { firebaseAuth } from '../config/constants';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Grid, Row, Col, Button, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';
import { base } from '../config/constants';
import ChargeMoney from '../helpers/payment'

export default class NewSubscription extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      subscriptionStep: 1,
      CardMessage: '',
      sender: '',
      address: '',
      deliveryDay: 'Monday',
      selectPlanType: 'Florist Choice (seasonal flower)',
      selectPlanSize: 'Simple (single major bloom, 53HKD per week)',
      price: 5300,
      deliveryFee: 0,
      grandTotal: 5300,
      currencyType: 'HKD',
      planID: 'HKSimple53',
      recipient: '',
      recipientNum: '',
      company: '',
      address: '',
      senderNum: ''
    }
  }

  handleRegionSelect = (eventKey) => {
    this.props.onRegionSelection(eventKey);
    if (eventKey == "HK - Admiralty" || eventKey == "HK - Central") {
        this.setState({deliveryDay: 'Monday'});
    } else if (eventKey =="HK - Chai Wan") {
        this.setState({deliveryDay: 'Wednesday'});
    }
  }

  handlePlanTypeSelect = (eventKey) => {
    this.setState({selectPlanType: eventKey});
  }
  handlePlanSizeSelect = (eventKey) => {
    this.setState({selectPlanSize: eventKey});
    if (eventKey == "Simple (single major bloom, HKD53 per week)") {
        this.setState({price: 5300, currencyType: 'HKD', grandTotal: 5300+this.state.deliveryFee, planID: 'HKSimple53'});
    } else if (eventKey == "Boquet (6 major blooms, HKD233 per week)") {
        this.setState({price: 23300, currencyType: 'HKD', grandTotal: 23300+this.state.deliveryFee, planID: 'HKBoquet223'});
    }
  }
  handleCardMessage = (e) => {
    this.setState({cardMessage: e.target.value});
  }
  handleSender = (e) => {
    this.setState({sender: e.target.value});
  }
  handleRecipient = (e) => {
    this.setState({recipient: e.target.value});
  }
  handleRecipientNum = (e) => {
    this.setState({recipientNum: e.target.value});
  }
  handleCompany = (e) => {
    this.setState({company: e.target.value});
  }
  handleAddress = (e) => {
    this.setState({address: e.target.value});
  }
  handleSenderNum = (e) => {
    this.setState({senderNum: e.target.value});
  }

  componentDidMount () {
    this.setState({loading: false});
    }

  render () {

    var data = this.state.subscriptionData;
    var loadingState = this.state.loading;
    var subscriptionStep = this.state.subscriptionStep;
    var selectRegion = this.props.selectRegion;
    var selectPlanType = this.state.selectPlanType;
    var selectPlanSize = this.state.selectPlanSize;
    var sender = this.state.senderNum;
    var _this = this;

    let content = null;
    if (loadingState) {
        content = <div>Loading...</div>
    } else if (subscriptionStep==1){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col xs={12}>
                            <div className="flow-selected">Choose</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Card</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Delivery</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Review</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Payment</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                </Grid>
                <DropdownButton title={selectRegion} className="subscription-select" id="subscriptioin-regionSelect-dropdown" onSelect={this.handleRegionSelect}>
                    <MenuItem eventKey="HK - Admiralty">HK - Admiralty</MenuItem>
                    <MenuItem eventKey="HK - Central">HK - Central</MenuItem>
                    <MenuItem eventKey="HK - Chai Wan">HK - Chai Wan</MenuItem>
                </DropdownButton>
                <div>Weekly Delivery on: {this.state.deliveryDay}</div>
                <div>*Only one delivery day option is avaiable for this region at the moment.</div>
                <DropdownButton title={selectPlanType} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={this.handlePlanTypeSelect}>
                    <MenuItem eventKey="Florist Choice (seasonal flower)">Florist Choice (seasonal flower)</MenuItem>
                    <MenuItem eventKey="Florist Choice (seasonal rose only)">Florist Choice (seasonal rose only)</MenuItem>
                </DropdownButton>
                <DropdownButton title={selectPlanSize} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={this.handlePlanSizeSelect}>
                    <MenuItem eventKey="Simple (single major bloom, HKD53 per week)">Simple (single major bloom, HKD53 per week)</MenuItem>
                    <MenuItem eventKey="Boquet (6 major blooms, HKD233 per week)">Boquet (6 major blooms, HKD233 per week)</MenuItem>
                </DropdownButton>

                <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 2})}>Next</Button>
            </div>
        )
    } else if (subscriptionStep==2){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col xs={12}>
                            <div>Choose</div>
                            <i className="fa fa-chevron-right"></i>
                            <div className="flow-selected">Card</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Delivery</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Review</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Payment</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                </Grid>
                <FormGroup>
                    <ControlLabel>Card Message :</ControlLabel>
                    <FormControl value={this.state.cardMessage} componentClass="textarea" placeholder="Card Message - the card can fit up to 100 words nicely" onChange={this.handleCardMessage}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>From:</ControlLabel>
                    <FormControl value={this.state.sender} type="text" placeholder="Sender's Name - optional" onChange={this.handleSender}/>
                </FormGroup>
                <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 1})}>Back</Button>
                <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 3})}>Next</Button>
            </div>
        )
    } else if (subscriptionStep==3){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col xs={12}>
                            <div>Choose</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Card</div>
                            <i className="fa fa-chevron-right"></i>
                            <div className="flow-selected">Delivery</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Review</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Payment</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col md={2}><ControlLabel>Name:</ControlLabel></Col>
                            <Col md={4}><FormControl value={this.state.recipient} type="text" placeholder="Recipient's name" onChange={this.handleRecipient}/></Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col md={2}><ControlLabel>Recipient's Number:</ControlLabel></Col>
                            <Col md={4}><FormControl value={this.state.recipientNum} type="text" placeholder="Recipient's phone number" onChange={this.handleRecipientNum}/></Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col md={2}><ControlLabel>Company:</ControlLabel></Col>
                            <Col md={4}><FormControl value={this.state.company} type="text" placeholder="Recipient's company or location name" onChange={this.handleCompany}/></Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col md={2}><ControlLabel>Address:</ControlLabel></Col>
                            <Col md={4}><FormControl value={this.state.address} type="text" placeholder="Recipient's name - for delivery" onChange={this.handleAddress}/></Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col md={2}><ControlLabel>Sender's Number:</ControlLabel></Col>
                            <Col md={4}><FormControl value={this.state.senderNum} type="text" placeholder="Your phone number (optional)" onChange={this.handleSenderNum}/></Col>
                        </FormGroup>
                    </Row>
                </Grid>
                <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 2})}>Back</Button>
                <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 4})}>Next</Button>
            </div>
        )
    } else if (subscriptionStep==4){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col xs={12}>
                            <div>Choose</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Card</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Delivery</div>
                            <i className="fa fa-chevron-right"></i>
                            <div className="flow-selected">Review</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Payment</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                    <Row className="show-grid">
                        <Col md={2}><h4>Recipient:</h4></Col>
                        <Col md={6}><div>{this.state.recipient}</div></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={2}><h4>Recipient Phone:</h4></Col>
                        <Col md={6}><div>{this.state.recipientNum}</div></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={2}><h4>Company:</h4></Col>
                        <Col md={6}><div>{this.state.company}</div></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={2}><h4>Address:</h4></Col>
                        <Col md={6}><div>{this.state.address}</div></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={2}><h4>Card Message:</h4></Col>
                        <Col md={6}><div>{this.state.cardMessage}</div></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={2}><h4>From:</h4></Col>
                        <Col md={6}><div>{this.state.sender}</div></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={2}><h4>Sender's Phone:</h4></Col>
                        <Col md={6}><div>{this.state.sender}</div></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={2}><h4>Subscription Type:</h4></Col>
                        <Col md={6}><div>{this.state.selectPlanType}</div></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={2}><h4>Subscription Size:</h4></Col>
                        <Col md={6}><div>{this.state.selectPlanSize}</div></Col>
                    </Row>
                </Grid>
                <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 3})}>Back</Button>
                <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 5})}>Next</Button>
            </div>
        )
    } else if (subscriptionStep==5){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col xs={12}>
                            <div>Choose</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Card</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Delivery</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>Review</div>
                            <i className="fa fa-chevron-right"></i>
                            <div className="flow-selected">Payment</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                    <Row className="show-grid">
                        <Col md={2}><h4>Plan:</h4></Col>
                        <Col md={6}><div>{this.state.selectPlanSize}</div></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={2}><h4>Delivery Fee:</h4></Col>
                        <Col md={6}><div>{this.state.deliveryFee}</div></Col>
                    </Row>
                    <Row className="show-grid">
                        <Col md={2}><h4>Grand Total:</h4></Col>
                        <Col md={6}><div>{this.state.currencyType}{this.state.grandTotal/100}</div></Col>
                    </Row>
                </Grid>
                <ChargeMoney price={this.state.price} planID={this.state.planID}/>
                <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 4})}>Back</Button>
            </div>
        )
    }

    return (
        <div className="loggedin-background">
          <Grid>
            <Row className="show-grid loggedin-nav">
              <Col xs={4} className="loggedin-nav-button">
                <Link to="/subscriptions">
                  <i className="fa fa-tags fa-lg nav-icon"></i>
                  <div className="nav-icon-title">My<br/>Subscriptions</div>
                </Link>
              </Col>
              <Col xs={4} className="loggedin-nav-button">
                <Link to="/newsubscription" className="nav-selected">
                  <i className="fa fa-plus fa-lg nav-icon"></i>
                  <div className="nav-icon-title">New<br/>Subscription</div>
                </Link>
              </Col>
              <Col xs={4} className="loggedin-nav-button">
                <Link to="/accountinfo">
                    <i className="fa fa-user-circle fa-lg nav-icon"></i>
                    <div className="nav-icon-title">Account<br/>Information</div>
                </Link>
              </Col>
            </Row>
            <Row className="show-grid loggedin-margin-box">
              <Col className="loggedin-content">
                  {content}
              </Col>
            </Row>
          </Grid>
        </div>
      )
  }
}