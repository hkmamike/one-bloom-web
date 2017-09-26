import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Grid, Row, Col, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import ChargeMoney from '../helpers/payment'
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en:{
    mySubscriptions1: 'My',
    mySubscriptions2: 'Subscriptions',
    newSubscription1: 'New',
    newSubscription2: 'Subscription',
    accountInformation1: 'Account',
    accountInformation2: 'Information',
    navChoose: 'Choose',
    navCard: 'Card',
    navDelivery: 'Delivery',
    navReview: 'Review',
    navPayment: 'Payment',
    navConfirm: 'Confirm',
    nextButton: 'Next',
    backButton: 'Back',
    deliveryArea: 'Delivery Area:',
    deliveryTip1: '*Only one delivery day option is avaiable for this region at the moment.',
    deliveryTip2_1: '**Delivery for ',
    deliveryTip2_2: ' is on',
    deliveryTip2_3: '. If the delivery day is a holiday or delivery is not available because of abnormal circumstances, delivery will take place on the next working day or according to special arrangements.',
    planFlowers: 'Flowers:',
    planSize: 'Size:',
    firstDelivery: 'First Delivery:',
    firstPayment: 'First Payment:',
    cardMessage: 'Card Message:',
    cardMessagePlaceholder: 'card Message - optional, the card can fit up to 100 words nicely',
    cardMessageTip1_1: '*Please include the desired recipient name and sender name on the card.',
    cardMessageTip1_2: " The cut off time to change card message for is at 11:59 pm on Wednesday prior to the next week's delivery.",
    from: 'From:',
    fromPlaceholder: "sender's name",
    fromTip: '*If you have included a name on the card message, we will use that and this will only serve to update your account information.',
    recipientName: "Recipient's name:",
    recipientNamePlaceholder: 'for delivery',
    recipientNum: "Recipient's number:",
    recipientNumPlaceholder: 'for delivery',
    recipientCompany: 'Location name:',
    recipientCompanyPlaceholder: "recipient's company or location name",
    recipientAddress: 'Address:',
    recipientAddressPlaceholder: 'delivery address',
    senderNum: "Sender's number:",
    senderNumPlaceholder: 'your phone number',
    senderNumTip: '*We will use this to update your account information and to service your subscription.',
    total: 'Total:',
    deliveryFee: 'Delivery Fee:',
    deliveryDay: 'Delivery Day:',
    subscribeButton: 'Subscribe',
    paymentTip: '*You are signing up for a weekly subscription service. Your card will be charged at the weekly cut off time at 11:59pm HKT on Wednesday, and delivery will made in the following week. If you would like to cancel the subscription, please go to My Subscriptions > Subscription Details.',
    subID: 'Subscription ID:',
    mySubscriptionsButton: 'My Subscription',
    HK_Admiralty: 'HK-Admiralty',
    HK_Central: 'HK-Central',
    HK_ChaiWan: 'HK-Chai Wan, Home/Office',
    HK_ChaiWan_BMCPC: 'HK-Chai Wan, BMCPC',
    HK_ChaiWan_CapeCollison: 'HK-Chai Wan, Cape Collison',
    flower_all: 'Seasonal Flower (all)',
    flower_rose: 'Seasonal Flower (rose only)',
    plan_simple: 'Simple (1-2 blooms, HKD53/week)',
    plan_elegant: 'Elegant (2-4 blooms, HKD93/week)',
    plan_bloom: 'Bloom (5-10 blooms, HKD223/week)',
    everyMonday: 'Every Monday',
    everyWednesday: 'Every Wednesday',
    
  },
  ch: {
    mySubscriptions1: ' ',
    mySubscriptions2: '我的訂購',
    newSubscription1: ' ',
    newSubscription2: '新訂購',
    accountInformation1: ' ',
    accountInformation2: '帳戶資料',
    navChoose: '選擇計劃',
    navCard: '信用卡',
    navDelivery: '配送資料',
    navReview: '檢查',
    navPayment: '付款',
    navConfirm: '確認',
    nextButton: '繼續',
    backButton: '返回',
    deliveryArea: '配送區域:',
    deliveryTip1: '*所選的地區目前只有一個收花日選擇。',
    deliveryTip2_1: '**',
    deliveryTip2_2: '的配送日為',
    deliveryTip2_3: '。如果配送日為公眾假期或因為有其他不可抗力令配送不可能，我們會在下一個工作天或根據特別安排送貨。',
    planFlowers: '花種:',
    planSize: '大小:',
    firstDelivery: '第一次配送:',
    firstPayment: '第一次付款:',
    cardMessage: '問候卡信息:',
    cardMessagePlaceholder: '問候卡信息 - 非必要，問候卡片可以寫最多100字。',
    cardMessageTip1_1: '請在此欄填寫問候卡手寫信息的上下款。',
    cardMessageTip1_2: '*更改問候卡信息的截止期限為配送日前一週的星期三晚上 11:59 p.m.',  
    from: '送花人:',
    fromPlaceholder: '送花人名字',
    fromTip: '*我們在手寫問候卡信息時會以問候卡信息欄中的名稱為準，如您已經在問候卡信息欄中填寫名稱，此欄只會用作帳戶資訊更新。',
    recipientName: "收花人名字:",
    recipientNamePlaceholder: '配送用',
    recipientNum: "收花人電話:",
    recipientNumPlaceholder: '配送用',
    recipientCompany: '地點名稱:',
    recipientCompanyPlaceholder: "收花人公司或地點名稱",
    recipientAddress: '地址:',
    recipientAddressPlaceholder: '配送用',
    senderNum: "送花人名字電話:",
    senderNumPlaceholder: '您的電話號碼',
    senderNumTip: '*此欄會用作帳戶資訊更新和訂單跟進。',
    total: '總價:',
    deliveryFee: '配送費:',
    deliveryDay: '配送日:',
    subscribeButton: '訂購',
    paymentTip: '*您現在訂購的是一個每週一次的鮮花設計和配送服務，您的信用卡會在每個配送週之前的星期三晚上 11:59 p.m. 付款。如果您想取消訂購，可以到 "我的帳戶" ＞ "訂購詳情" 辦理。',
    subID: '訂購號碼:',
    mySubscriptionsButton: '我的訂購',
    HK_Admiralty: '香港-金鐘',
    HK_Central: '香港-中環',
    HK_ChaiWan: '香港-柴灣(住家/辦公室)',
    HK_ChaiWan_BMCPC: '香港-柴灣墓園(華人永遠)',
    HK_ChaiWan_CapeCollison: '香港-柴灣墓園(歌連臣角十字架)',
    flower_all: '時令花種(所有)',
    flower_rose: '時令花種(只要玫瑰)',
    plan_simple: '簡單(1-2朵主花，每週 HKD53)',
    plan_elegant: '優雅(2-4朵主花，每週 HKD93)',
    plan_bloom: '盛會(5-10朵主花，每週 HKD223)',
    everyMonday: '每週星期一',
    everyWednesday: '每週星期三',
  }
});

export default class NewSubscription extends Component {

  constructor() {
    super();
    this.handleSubscriptionStep = this.handleSubscriptionStep.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.state = {
      loading: true,
      subscriptionStep: 1,
      cardMessage: '',
      sender: '',
      address: '',
      deliveryDay: 'everyMonday',
      selectPlanType: 'flower_all',
      selectPlanSize: 'plan_simple',
      price: 5300,
      deliveryFee: 0,
      grandTotal: 5300,
      currencyType: 'HKD',
      planID: 'HKSimple53',
      recipient: '',
      recipientNum: '',
      company: '',
      senderNum: '',
      stripeSubID: '',
      firstPayment: ''
    }
  }

  calculateFirstDelivery() {
    var deliveryDay = this.state.deliveryDay;
    //Calculate First Delivery Date
    var d = new Date();
    var firstDelivery = new Date();
    if (d.getDay()!==3) {
        d.setDate(d.getDate() + (3 + 7 - d.getDay()) % 7);
        d.setHours(15);
        d.setMinutes(59);
        d.setSeconds(59);
    } else {
        d.setHours(15);
        d.setMinutes(59);
        d.setSeconds(59);
      }
    //Redundant math is used to simulate calculation on webtask and stripe
    var firstPayment = new Date(Math.floor(d.getTime()/1000)*1000);
    if (deliveryDay==="everyMonday") {
        firstDelivery.setDate(firstPayment.getDate() + (1 + 7 - firstPayment.getDay()) % 7);
        this.setState({firstDelivery: firstDelivery, firstPayment: firstPayment});
        console.log('first Monday delivery will happen on: ', firstDelivery);
    } else if (deliveryDay==="everyWednesday") {
        firstDelivery.setDate(firstPayment.getDate() + 7);
        console.log('first Wednesday delivery will happen on: ', firstDelivery);
        this.setState({firstDelivery: firstDelivery, firstPayment: firstPayment});
    }
  }

  handleSubscriptionStep(stripeSubID, firstPayment, firstDelivery) {
    this.setState({subscriptionStep : 6, stripeSubID: stripeSubID, firstPayment: firstPayment, firstDelivery: firstDelivery, loading: false});
  }
  handleLoading() {
    this.setState({loading: true});
  }
  handleRegionSelect = (eventKey) => {
    this.props.onRegionSelection(eventKey);
    if (eventKey === "HK_Admiralty" || eventKey === "HK_Central") {
        this.setState({deliveryDay: 'everyMonday'}, this.calculateFirstDelivery);
    } else if (eventKey ==="HK_ChaiWan" || eventKey ==="HK_ChaiWan_BMCPC" || eventKey ==="HK_ChaiWan_CapeCollison") {
        this.setState({deliveryDay: 'everyWednesday'}, this.calculateFirstDelivery);
    }
  }
  handlePlanTypeSelect = (eventKey) => {
    this.setState({selectPlanType: eventKey});
  }
  handlePlanSizeSelect = (eventKey) => {
    this.setState({selectPlanSize: eventKey});
    if (eventKey === "plan_simple") {
        this.setState({price: 5300, currencyType: 'HKD', grandTotal: 5300+this.state.deliveryFee, planID: 'HKSimple53'});
    } else if (eventKey === "plan_elegant") {
        this.setState({price: 9300, currencyType: 'HKD', grandTotal: 9300+this.state.deliveryFee, planID: 'HKElegant93'});
    } else if (eventKey === "plan_bloom") {
        this.setState({price: 23300, currencyType: 'HKD', grandTotal: 23300+this.state.deliveryFee, planID: 'HKBloom223'});
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

  componentWillMount() {
    this.calculateFirstDelivery();
    strings.setLanguage(this.props.languageChanged);
  }

  componentDidMount() {
    this.setState({loading: false});
    }

  componentWillReceiveProps (nextProps) {
    if (nextProps.languageChanged==='ch') {
      strings.setLanguage('ch');
    } else if (nextProps.languageChanged==='en') {
      strings.setLanguage('en');
    }
  }

  render() {

    var loadingState = this.state.loading;
    var subscriptionStep = this.state.subscriptionStep;
    var selectRegion = this.props.selectRegion;
    var selectPlanType = this.state.selectPlanType;
    var selectPlanSize = this.state.selectPlanSize;

    let content = null;
    if (subscriptionStep===1){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col xs={12}>
                            <div className="flow-selected">{strings.navChoose}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navCard}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navDelivery}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navReview}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navPayment}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navConfirm}</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                </Grid>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}><div><strong>{strings.deliveryArea}</strong></div></Col>
                        <Col sm={6}>
                            <DropdownButton title={strings[selectRegion]} className="subscription-select" id="subscriptioin-regionSelect-dropdown" onSelect={this.handleRegionSelect}>
                            <MenuItem eventKey="HK_Admiralty">{strings.HK_Admiralty}</MenuItem>
                            <MenuItem eventKey="HK_Central">{strings.HK_Central}</MenuItem>
                            <MenuItem eventKey="HK_ChaiWan">{strings.HK_ChaiWan}</MenuItem>
                            <MenuItem eventKey="HK_ChaiWan_BMCPC">{strings.HK_ChaiWan_BMCPC}</MenuItem>
                            <MenuItem eventKey="HK_ChaiWan_CapeCollison">{strings.HK_ChaiWan_CapeCollison}</MenuItem>
                            <MenuItem eventKey="other">{strings.other}</MenuItem>
                            </DropdownButton>
                            <div className="subscription-tips">{strings.deliveryTip1}</div>
                            <div className="subscription-tips">{strings.deliveryTip2_1} <strong>{strings[selectRegion]}</strong> {strings.deliveryTip2_2} <strong>{strings[this.state.deliveryDay]}</strong>{strings.deliveryTip2_3}</div>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}><div><strong>{strings.planFlowers}</strong></div></Col>
                        <Col sm={6}>
                            <DropdownButton title={strings[selectPlanType]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={this.handlePlanTypeSelect}>
                                <MenuItem eventKey="flower_all">{strings.flower_all}</MenuItem>
                                <MenuItem eventKey="flower_rose">{strings.flower_rose}</MenuItem>
                            </DropdownButton>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}><div><strong>{strings.planSize}</strong></div></Col>
                        <Col sm={6}>
                            <DropdownButton title={strings[selectPlanSize]} className="subscription-select" id="subscriptioin-planTypeSelect-dropdown" onSelect={this.handlePlanSizeSelect}>
                                <MenuItem eventKey="plan_simple">{strings.plan_simple}</MenuItem>
                                <MenuItem eventKey="plan_elegant">{strings.plan_elegant}</MenuItem>
                                <MenuItem eventKey="plan_bloom">{strings.plan_bloom}</MenuItem>
                            </DropdownButton>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}><div><strong>{strings.firstDelivery}</strong></div></Col>
                        <Col sm={6}>
                            <div>{this.state.firstDelivery.toLocaleDateString()}</div>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}><div><strong>{strings.firstPayment}</strong></div></Col>
                        <Col sm={6}>
                            <div>{this.state.firstPayment.toLocaleDateString()}</div>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={5}></Col>
                        <Col sm={4}>
                            <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 2})}>{strings.nextButton}</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    } else if (subscriptionStep===2){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col xs={12}>
                            <div>{strings.navChoose}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div className="flow-selected">{strings.navCard}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navDelivery}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navReview}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navPayment}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navConfirm}</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                </Grid>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}>
                            <div><strong>{strings.cardMessage}</strong></div>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <FormControl value={this.state.cardMessage} componentClass="textarea" className="cardMessage" placeholder={strings.cardMessagePlaceholder} onChange={this.handleCardMessage}/>
                                <div className="subscription-tips">{strings.cardMessageTip1_1}{strings.cardMessageTip1_2}</div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}>
                            <div><strong>{strings.from}</strong></div>
                        </Col>
                        <Col sm={6}>
                            <FormGroup>
                                <FormControl value={this.state.sender} type="text" placeholder={strings.fromPlaceholder} onChange={this.handleSender}/>
                                <div className="subscription-tips">{strings.fromTip}</div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={5}></Col>
                        <Col sm={4}>
                            <Button bsStyle="" className="button button-back" onClick={() => this.setState({subscriptionStep: 1})}>{strings.backButton}</Button>
                            <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 3})}>{strings.nextButton}</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    } else if (subscriptionStep===3){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col xs={12}>
                            <div>{strings.navChoose}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navCard}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div className="flow-selected">{strings.navDelivery}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navReview}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navPayment}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navConfirm}</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                </Grid>
                <Grid>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>{strings.recipientName}</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.recipient} type="text" onChange={this.handleRecipient} placeholder={strings.recipientNamePlaceholder}/>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>{strings.recipientNum}</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.recipientNum} type="text" placeholder={strings.recipientNumPlaceholder} onChange={this.handleRecipientNum}/>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>{strings.recipientCompany}</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.company} type="text" placeholder={strings.recipientCompanyPlaceholder} onChange={this.handleCompany}/>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>{strings.recipientAddress}</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.address} componentClass="textarea" className="recipientAddress" onChange={this.handleAddress} placeholder={strings.recipientAddressPlaceholder}/>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <ControlLabel>{strings.senderNum}</ControlLabel>
                            </Col>
                            <Col sm={6}>
                                <FormControl value={this.state.senderNum} type="text" placeholder={strings.senderNumPlaceholder} onChange={this.handleSenderNum}/>
                                <div className="subscription-tips">{strings.senderNumTip}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={5}></Col>
                        <Col sm={4}>
                            <Button bsStyle="" className="button button-back" onClick={() => this.setState({subscriptionStep: 2})}>{strings.backButton}</Button>
                            <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 4})}>{strings.nextButton}</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    } else if (subscriptionStep===4){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col xs={12}>
                            <div>{strings.navChoose}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navCard}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navDelivery}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div className="flow-selected">{strings.navReview}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navPayment}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navConfirm}</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                </Grid>
                <Grid>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.recipientName}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.recipient}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.recipientNum}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.recipientNum}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.recipientCompany}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.company}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.recipientAddress}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.address}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.deliveryDay}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{strings[this.state.deliveryDay]}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.cardMessage}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.cardMessage}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.from}</strong></div>
                            </Col>
                            <Col sm={6}>
                            <div>{this.state.sender}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.senderNum}</strong></div>
                            </Col>
                            <Col sm={6}>
                                <div>{this.state.senderNum}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.planFlowers}</strong></div>
                            </Col>
                            <Col sm={6}>
                            <div>{strings[this.state.selectPlanType]}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <FormGroup>
                            <Col sm={2}></Col>
                            <Col sm={3}>
                                <div><strong>{strings.planSize}</strong></div>
                            </Col>
                            <Col sm={6}>
                            <div>{strings[this.state.selectPlanSize]}</div>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="show-grid">
                        <Col sm={5}></Col>
                        <Col sm={4}>
                            <Button bsStyle="" className="button button-back" onClick={() => this.setState({subscriptionStep: 3})}>{strings.backButton}</Button>
                            <Button bsStyle="" className="button" onClick={() => this.setState({subscriptionStep: 5})}>{strings.nextButton}</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    } else if (subscriptionStep===5){
        if (loadingState) {
            content = (
                <div>
                    <Grid>
                        <Row className="show-grid loggedin-flow">
                            <div className="horizontal-line"></div>
                            <Col xs={12}>
                                <div>{strings.navChoose}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>{strings.navCard}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>{strings.navDelivery}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>{strings.navReview}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div className="flow-selected">{strings.navPayment}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>{strings.navConfirm}</div>
                            </Col>
                            <div className="horizontal-line"></div>
                        </Row>
                    </Grid>
                    <div className="loader"></div>
                </div>
            )
        } else {
            content = (
                <div>
                    <Grid>
                        <Row className="show-grid loggedin-flow">
                            <div className="horizontal-line"></div>
                            <Col xs={12}>
                                <div>{strings.navChoose}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>{strings.navCard}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>{strings.navDelivery}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>{strings.navReview}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div className="flow-selected">{strings.navPayment}</div>
                                <i className="fa fa-chevron-right"></i>
                                <div>{strings.navConfirm}</div>
                            </Col>
                            <div className="horizontal-line"></div>
                        </Row>
                    </Grid>
                    <Grid>
                        <Row className="show-grid">
                            <FormGroup>
                                <Col sm={2}></Col>
                                <Col sm={3}>
                                    <div><strong>{strings.planSize}</strong></div>
                                </Col>
                                <Col sm={6}>
                                    <div>{strings[this.state.selectPlanSize]}</div>
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row className="show-grid">
                            <FormGroup>
                                <Col sm={2}></Col>
                                <Col sm={3}>
                                    <div><strong>{strings.deliveryFee}</strong></div>
                                </Col>
                                <Col sm={6}>
                                    <div>{this.state.deliveryFee}</div>
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row className="show-grid">
                            <FormGroup>
                                <Col sm={2}></Col>
                                <Col sm={3}>
                                    <div><strong>{strings.total}</strong></div>
                                </Col>
                                <Col sm={6}>
                                    <div>{this.state.currencyType}{this.state.grandTotal/100}</div>
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row className="show-grid">
                            <Col sm={2}></Col>
                            <Col sm={3}><div><strong>{strings.firstDelivery}</strong></div></Col>
                            <Col sm={6}>
                                <div>{this.state.firstDelivery.toLocaleDateString()}</div>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col sm={2}></Col>
                            <Col sm={3}><div><strong>{strings.firstPayment}</strong></div></Col>
                            <Col sm={6}>
                                <div>{this.state.firstPayment.toLocaleDateString()}</div>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col sm={2}></Col>
                            <Col sm={9}>
                                <div className="subscription-tips">{strings.paymentTip}</div>
                            </Col>
                        </Row>

                        <Row className="show-grid">
                            <Col sm={5}></Col>
                            <Col sm={4}>
                                <Button bsStyle="" className="button button-back" onClick={() => this.setState({subscriptionStep: 4})}>{strings.backButton}</Button>
                                <ChargeMoney
                                    price={this.state.price} 
                                    planID={this.state.planID}
                                    selectRegion={selectRegion}
                                    selectPlanType={this.state.selectPlanType}
                                    selectPlanSize={this.state.selectPlanSize}
                                    grandTotal ={this.state.grandTotal}
                                    sender={this.state.sender}
                                    senderNum={this.state.senderNum}
                                    recipient={this.state.recipient}
                                    recipientNum={this.state.recipientNum}
                                    company={this.state.company}
                                    address={this.state.address}
                                    cardMessage={this.state.cardMessage}
                                    deliveryDay = {this.state.deliveryDay}
                                    onSubscriptionStep={this.handleSubscriptionStep}
                                    onLoading={this.handleLoading}
                                    languageChanged={this.props.languageChanged}
                                />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            )
        }
    }   else if (subscriptionStep===6){
        content = (
            <div>
                <Grid>
                    <Row className="show-grid loggedin-flow">
                        <div className="horizontal-line"></div>
                        <Col xs={12}>
                            <div>{strings.navChoose}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navCard}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navDelivery}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navReview}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div>{strings.navPayment}</div>
                            <i className="fa fa-chevron-right"></i>
                            <div className="flow-selected">{strings.navConfirm}</div>
                        </Col>
                        <div className="horizontal-line"></div>
                    </Row>
                </Grid>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={2}></Col>
                        <Col sm={3}>
                            <div><strong>{strings.subID}</strong></div>
                        </Col>
                        <Col sm={6}>
                            <div>{this.state.stripeSubID}</div>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                   
                        <Col sm={2}></Col>
                        <Col sm={3}>
                            <div><strong>{strings.firstPayment}</strong></div>
                        </Col>
                        <Col sm={6}>
                            <div>{this.state.firstPayment.toLocaleDateString()}</div>
                        </Col>
                      
                    </Row>
                    <Row className="show-grid">
                 
                        <Col sm={2}></Col>
                        <Col sm={3}>
                            <div><strong>{strings.firstDelivery}</strong></div>
                        </Col>
                        <Col sm={6}>
                            <div>{this.state.firstDelivery.toLocaleDateString()}</div>
                        </Col>
                     
                    </Row>
                    <Row className="show-grid">
                        <Col sm={5}></Col>
                        <Col sm={4}>
                            <Button bsStyle="" className="button button-back"><Link to="/subscriptions">{strings.mySubscriptionsButton}</Link></Button>
                        </Col>
                    </Row>
                </Grid>
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
                <div className="nav-icon-title">{strings.mySubscriptions1}<br/>{strings.mySubscriptions2}</div>
                </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
                <Link to="/newsubscription" className="nav-selected">
                <i className="fa fa-plus fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.newSubscription1}<br/>{strings.newSubscription2}</div>
                </Link>
            </Col>
            <Col xs={4} className="loggedin-nav-button">
                <Link to="/accountinfo">
                <i className="fa fa-user-circle fa-lg nav-icon"></i>
                <div className="nav-icon-title">{strings.accountInformation1}<br/>{strings.accountInformation2}</div>
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