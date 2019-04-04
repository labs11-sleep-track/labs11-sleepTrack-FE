import React from "react";
import axios from "axios";
import InjectForm from "./InjectForm";
import { StripeProvider, Elements } from "react-stripe-elements";
import styled from "styled-components";

const H1 = styled.h1`
  @media (min-width: 1920px) {
    text-align: center;
    margin-bottom: 25px;
  }
`;

export default class Checkout extends React.Component {
  onToken = (token, addresses) => {
    const body = {
      amount: 1000,
      token: token
    };

    axios
      .post("http://sleepsta.herokuapp.com/api/stripe/charge", body)
      .then(response => {
        console.log(response);
        alert("Payment Success");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };

  render() {
    return (
      <div>
        <H1>Buy Premium</H1>
        <StripeProvider apiKey="pk_test_IuV3H4bcKKItAUmS8Mxxb2yl00E18jGeXN">
          <Elements>
            <InjectForm />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}
