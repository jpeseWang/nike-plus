import React from "react";
import PaypalButton from "./Paypal";

export default function Payment({ totalPrice }) {
  const price = totalPrice;
  return (
    <div>
      <div>
        <PaypalButton price={price} />
      </div>
    </div>
  );
}
