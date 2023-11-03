import React from 'react';

const PricingTable = (props) => {
  return (
    <stripe-pricing-table
      pricing-table-id={props.pricingTableId}
      publishable-key={props.publishableKey}
    />
  );
};

export default PricingTable;
