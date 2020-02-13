import React from 'react';
import { useParams } from 'react-router-dom';

export const OrderPreviewComponent = () => {
  const { orderId } = useParams();

  return (
    <>
      {orderId}
    </>
  );
};
