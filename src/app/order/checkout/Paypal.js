"use client";
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

class PaypalButton extends React.Component {
  render() {
    const { price } = this.props;
    return (
      <PayPalScriptProvider
        options={{
          "client-id":
            "AXYgyTx4qwXsrrsU542mR7ikxspY9M6EPMx0gj8lo0uO9ExVBQwFgjKs65miZNZ4srIPe1grTKG3DmIu",
        }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: price.toString(), // Change this to your desired amount
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(function (details) {
              // Show a success message to the buyer
              alert(
                "Transaction completed by " +
                  details.payer.name.given_name +
                  "!"
              );
            });
          }}
        />
      </PayPalScriptProvider>
    );
  }
}

export default PaypalButton;
