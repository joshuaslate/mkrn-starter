/**
 * Created by highlander on 10/3/17.
 */
import React, { Component } from 'react';

import QRCode from 'react-qr';
import bitcoin from '../../components/billing/bitcoin';
// var QRCode = require('react-qr')


class CreditCardFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
    };
    this.onButtonClick = this.onButtonClick.bind(this);
  }

    componentDidMount = () => {
      // Mount Stripe elements
      this.address = '1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v';
    };

    // onSubmit = () => {
    //   this.address = '1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v';
    //   console.log('KSADJFHSDKFJGHSDKJFHSDKJFHSDJKHFKJDSFHDSKJFHJSKDFH');
    // }


    onButtonClick() {
      this.setState({
        showComponent: true,
      });
    }

    render() {
      return (
        <h1>Buy Funbucks bro!
          <br />

          {/* <button onClick={this.onSubmit} className="btn btn-info btn-lg"> */}
          {/* <span className="glyphicon glyphicon-bitcoin" /> Bitcoin */}
          {/* </button> */}


          <div>
            <button onClick={this.onButtonClick} className="btn btn-info btn-lg"><span className="glyphicon glyphicon-bitcoin" /> Bitcoin</button>
            {this.state.showComponent ?
              <QRCode text={this.address} /> :
              null
            }
          </div>

          {/* <QRCode value="hey" /> */}

          {/* <ul className="form-list"> */}
          {/* <li> */}
          {/* <label htmlFor="card-element"> */}
          {/* {this.props.label} */}
          {/* </label> */}
          {/* <div id="card-element" /> */}
          {/* </li> */}
          {/* </ul> */}
          <div id="card-errors" role="alert" />

        </h1>
      );
    }
}

export default CreditCardFields;
