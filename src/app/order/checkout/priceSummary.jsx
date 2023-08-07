// components/OrderPrice.js

import React from "react";

const OrderPrice = ({ selectedDeliveryMethod, products }) => {
  const deliveryPrice = selectedDeliveryMethod.price;
  const totalPrice = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  const taxPrice = totalPrice * 0.1;
  const grandTotal = totalPrice + deliveryPrice + taxPrice;

  return (
    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      {/* Display the individual product items */}
      {/* ... */}
      <dl className="space-y-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <dt className="text-sm">Subtotal</dt>
          <dd className="text-sm font-medium text-gray-900">
            ${totalPrice.toFixed(2)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm">Shipping</dt>
          <dd className="text-sm font-medium text-gray-900">
            ${deliveryPrice.toFixed(2)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-sm">Taxes</dt>
          <dd className="text-sm font-medium text-gray-900">
            ${taxPrice.toFixed(2)}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <dt className="text-base font-medium">Total</dt>
          <dd className="text-base font-medium text-gray-900">
            ${grandTotal.toFixed(2)}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default OrderPrice;
