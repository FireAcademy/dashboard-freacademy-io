import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getStripeURL } from './api';

export default function PaymentInfo({ userData }) {
  const [loading, setLoading] = useState(false);

  const isPaying = userData && userData.has_active_stripe_subscription;

  const cardText = isPaying ?
    "Click on the 'Payment Dashboard' button to manage your subscription." :
    "We use Stripe to process payments. Click the 'Add Payment Method' button to upgrade your account.";

  const buttonText = isPaying ? "Payment Dashboard" : "Add Payment Method";

  const handleClick = async () => {
    try {
      setLoading(true);
      const resp = await getStripeURL();
      console.log(resp);
      setLoading(false);

      window.location.href = resp.url;
    } catch(_) {
      console.log(_);
      console.log(_.message);
      alert("Error: " + _.message);
      setLoading(false);
    }
  }

  return (
    <section>
      <Card>
        <Card.Body>
          <Card.Title>
            Payments
            <Button variant="primary" className="float-end" onClick={handleClick} disabled={loading}>{buttonText}</Button>
          </Card.Title>
          <Card.Text className="fs-6">
            {cardText}
          </Card.Text>
        </Card.Body>
      </Card>
   </section>
  );
}