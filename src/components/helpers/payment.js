import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { Button } from 'react-bootstrap';
 
export default class ChargeMoney extends React.Component {
  onToken = (token) => {
    console.log('sending token to webtask, token is : ', token);
    fetch('https://wt-47cf129daee3aa0bf6d4064463e232ef-0.run.webtask.io/webtask-stripe-order'
    +'?paymentSource=' + token.id
    +'&paymentEmail=' + token.email, {
      method: 'POST',
    }).then(response => {
      response.json().then(data => {
        console.log ('token has been created: ', data);
        console.log ('customer id is:', data.id);
        console.log ('plandID is :', this.props.planID);
        fetch('https://wt-47cf129daee3aa0bf6d4064463e232ef-0.run.webtask.io/webtask-stripe-payment' 
        + '?customerID=' + data.id 
        + '&planID=' + this.props.planID, {
            method: 'POST',
          })
      });
    });
  }
 
  // ...
 
  render() {
    return (
      // ...
      <StripeCheckout
        name="One Bloom"
        description="Flower Subscription"
        image="" //app icon
        panelLabel="Pay" // prepended to the amount in the bottom pay button
        amount={this.props.price} // cents
        currency="HKD"
        stripeKey="pk_test_5AFpArfSAWtcsdRPGtFItgiH"
        locale="auto"
        label="Subscribe"
        allowRememberMe = {false} // "Remember Me" option (default true)
        token={this.onToken} // submit callback    
      >
        <Button bsStyle="" className="button">Subscribe</Button>
      </StripeCheckout>
    )
  }
}