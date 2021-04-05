import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
    // {paid: true, cancelled: false, 
    //   payerID: "S5H4YA3SNY4AY", 
    //   paymentID: "PAYID-MBVQBXA33F84872EE011141F", 
    //   paymentToken: "EC-2MP42672NB253403L", …}
    //   address: {recipient_name: "John Doe", 
    //   line1: "1 Cheeseman Ave Brighton East", 
    //   city: "Melbourne", 
    //   state: "Victoria", 
    //   postal_code: "3001", …}
    //   cancelled: false
    //   email: "goose-buyer@personal.example.com"
    //   paid: truepayerID: "S5H4YA3SNY4AY"
    //   paymentID: "PAYID-MBVQBXA33F84872EE011141F"
    //   paymentToken: "EC-2MP42672NB253403L"
    //   returnUrl: "https://www.paypal.com/checkoutnow/error?paymentId=PAYID-MBVQBXA33F84872EE011141F&token=EC-2MP42672NB253403L&PayerID=S5H4YA3SNY4AY"
    //   __proto__: Object

  
  	render() {

  		const onSuccess = (payment) => {
         console.log(payment);
         this.props.onSuccess(payment)
  		}

  		const onCancel = (data) => {
  			
  		}

      const onError = (err) => {

      }

      let env = 'sandbox';
      let currency = 'AUD';
      let total = this.props.toPay;

      const client = {
        sandbox: 'AeyY4TktL-LWUcqZ31n6PPBkKTDdyvurG8OjUSJf1voVox1K06DJKDBbyiq7HCfi1eyjkwJKKpWAkKBQ',
        production: ''
      }
    	return (
      		<div>
        		<PaypalExpressBtn 
              env={env}
              client={client}
              currency={currency}
              total={total}
              onError={onError} 
              onSuccess={onSuccess} 
              onCancel={onCancel}
              style={{
                size:'large',
                color:'blue',
                shape:'rect',
                label:'checkout'
              }}
            />
      		</div>
    )
  }
}

export default Paypal;