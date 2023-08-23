import React from "react";
import PaypalButton from "./Paypal";

export default function CheckoutPage() {
  const price2 = 200;
  return (
    <div>
      <h1>Paypal payment sandbox</h1>
      <div>
        <h2>Plus</h2>
        <PaypalButton price={price2} />
      </div>
    </div>
  );
}
