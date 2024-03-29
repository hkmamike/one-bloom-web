import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { Button } from 'react-bootstrap';
import * as firebase from 'firebase';
import { base } from '../config/constants';
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
  en:{
    subscribeButton: 'Subscribe',
    checkOutName: 'MayDaisy',
    checkOutDescription: 'Flower Subscription',
    checkOutLabel: 'Subscribe'

  },
  ch: {
    subscribeButton: '訂購',
    checkOutName: '五月菊',
    checkOutDescription: '鮮花訂購服務',
    checkOutLabel: '訂購'
  }
});

export default class ChargeMoney extends React.Component {

    constructor() {
        super();
        this.state = {
          errorMessage: '',
          stripeSubID: '',
          firstPayment: '',
          firstDelivery: ''
        }
    }

    componentWillMount() {
        strings.setLanguage(this.props.languageChanged);
    }
    
    componentWillReceiveProps (nextProps) {
        if (nextProps.languageChanged==='ch') {
            strings.setLanguage('ch');
        } else if (nextProps.languageChanged==='en') {
            strings.setLanguage('en');
        }
    }
    
    progressSubscriptionStep = (referenceCode, stripeSubID, firstPayment, firstdelivery) => {
        this.props.onSubscriptionStep(referenceCode, stripeSubID, firstPayment, firstdelivery);
        console.log('proceeding to confirmation page');
    }

    showLoader () {
        this.props.onLoading();
    }

    onToken = (token) => {
        var uid = firebase.auth().currentUser.uid;
        var selectRegion = this.props.selectRegion;
        var planID = this.props.planID;
        var selectPlanType = this.props.selectPlanType;
        var selectPlanSize = this.props.selectPlanSize;
        var selectLocationType = this.props.selectLocationType;
        var selectDeliveryType = this.props.selectDeliveryType;
        var languageChanged = this.props.languageChanged;
        var grandTotalPerWeek = this.props.grandTotal;
        var senderName = this.props.sender;
        var senderNum = this.props.senderNum;
        var senderEmail = token.email;
        var recipient = this.props.recipient;
        var recipientNum = this.props.recipientNum;
        var company = this.props.company;
        var address = this.props.address;
        var deliveryDay = this.props.deliveryDay;
        var cardMessage = this.props.cardMessage;
        var stripeTokID = token.id;
        var stripeCusID;
        var stripeSubID;
        var subscriptionTime;
        var firstPayment;
        var firstDelivery = new Date();
        var last4;
        var cardType;
        var cardExpYear;
        var cardExpMonth;
        var referenceRan = Math.floor(Math.random()*1000);
        var dateNow = new Date().getTime();
        var referenceCode = "" + referenceRan + dateNow;

        console.log('stripe created token. Forwarding to web server : ', token);
        console.log('reference code is :', referenceCode);
        this.showLoader();

        fetch('https://wt-47cf129daee3aa0bf6d4064463e232ef-0.run.webtask.io/webtask-stripe-order'
        +'?paymentSource=' + token.id
        +'&paymentEmail=' + token.email, {
        method: 'POST',
        })
        .then(response => {
            response.json().then(data => {
                console.log('customer created. Forwarding to subscription processor : ', data);
                stripeCusID = data.id;
                last4 = data.sources.data[0].last4;
                cardType = data.sources.data[0].brand;
                cardExpYear = data.sources.data[0].exp_year;
                cardExpMonth = data.sources.data[0].exp_month;
                fetch('https://wt-47cf129daee3aa0bf6d4064463e232ef-0.run.webtask.io/webtask-stripe-payment' 
                + '?customerID=' + data.id 
                + '&planID=' + this.props.planID, {
                    method: 'POST',
                })
                .then(response => {
                    response.json().then(data => {
                        console.log('response from subscription processor: ', data);
                        stripeSubID = data.id;
                        subscriptionTime = data.current_period_start;
                        firstPayment = new Date(data.current_period_end*1000);
                        console.log('firstPayment will happen on:', firstPayment);
                        if (deliveryDay==="everyMonday") {
                            firstDelivery.setDate(firstPayment.getDate() + (1 + 7 - firstPayment.getDay()) % 7);
                            console.log('first Monday delivery will happen on: ', firstDelivery);
                        } else if (deliveryDay==="everyTuesday") {
                            firstDelivery.setDate(firstPayment.getDate() + (2 + 7 - firstPayment.getDay()) % 7);
                            console.log('first Tuesday delivery will happen on: ', firstDelivery);
                        } else if (deliveryDay==="everyWednesday") {
                            firstDelivery.setDate(firstPayment.getDate() + 7);
                            console.log('first Wednesday delivery will happen on: ', firstDelivery);
                        }

                        this.setState({
                            stripeSubID: stripeSubID,
                            firstPayment: firstPayment,
                            firstDelivery: firstDelivery
                        });

                        base.post(`allSubscriptions/hongKong/${selectRegion}/${planID}/${referenceCode}`, {
                            data: {
                                uid: uid,
                                selectPlanType: selectPlanType,
                                selectPlanSize: selectPlanSize,
                                selectLocationType: selectLocationType,
                                grandTotalPerWeek: grandTotalPerWeek,
                                senderName: senderName,
                                senderNum: senderNum,
                                senderEmail: senderEmail,
                                recipient: recipient,
                                recipientNum: recipientNum,
                                company: company,
                                address: address,
                                deliveryDay: deliveryDay,
                                cardMessage: cardMessage,
                                stripeTokID: stripeTokID,
                                stripeCusID: stripeCusID,
                                stripeSubID: stripeSubID,
                                subscriptionAt: subscriptionTime,
                                firstPayment: firstPayment,
                                firstDelivery: firstDelivery,
                                last4: last4,
                                cardType: cardType,
                                cardExpYear: cardExpYear,
                                cardExpMonth: cardExpMonth,
                                referenceCode: referenceCode,
                                selectDeliveryType: selectDeliveryType,
                                languageChanged: languageChanged
                            }
                        });
                        base.post(`users/${uid}/subscriptions/${referenceCode}`, {
                            data: {
                                selectRegion: selectRegion,
                                planID: planID,
                                selectPlanType: selectPlanType,
                                selectPlanSize: selectPlanSize,
                                selectLocationType: selectLocationType,
                                grandTotalPerWeek: grandTotalPerWeek,
                                senderName: senderName,
                                senderNum: senderNum,
                                senderEmail: senderEmail,
                                recipient: recipient,
                                recipientNum: recipientNum,
                                company: company,
                                address: address,
                                deliveryDay: deliveryDay,
                                cardMessage: cardMessage,
                                stripeTokID: stripeTokID,
                                stripeCusID: stripeCusID,
                                stripeSubID: stripeSubID,
                                subscriptionAt: subscriptionTime,
                                firstPayment: firstPayment,
                                firstDelivery: firstDelivery,
                                last4: last4,
                                cardType: cardType,
                                cardExpYear: cardExpYear,
                                cardExpMonth: cardExpMonth,
                                referenceCode: referenceCode,
                                selectDeliveryType: selectDeliveryType,
                                languageChanged: languageChanged
                            }
                        });
                        base.update(`users/${uid}/info/`, {
                            data: {
                                name: senderName,
                                phone: senderNum,
                            }
                        });
                        console.log ('subscriptioin processing succeeded.');
                        this.progressSubscriptionStep(referenceCode, stripeSubID, firstPayment, firstDelivery);
                    });
                });
            });
        })
    }

    render() {
        return (
            <StripeCheckout
                name={strings.checkOutName}
                description={strings.checkOutDescription}
                image="https://firebasestorage.googleapis.com/v0/b/onebloom-cfa9d.appspot.com/o/logo.png?alt=media&token=d3f89daa-2818-4ec2-9aed-b006e7cd9f24" //app icon
                panelLabel="Pay" // prepended to the amount in the bottom pay button
                amount={this.props.price} // cents
                currency="HKD"
                stripeKey="pk_live_4DMkTz9So7I02XzeYkkKl6ye"
                locale="auto"
                label={strings.checkOutLabel}
                allowRememberMe = {false} // "Remember Me" option (default true)
                token={this.onToken} // submit callback    
            >
                <Button bsStyle="" className="button-new-sub">{strings.subscribeButton}</Button>
            </StripeCheckout>
        )
    }
}