/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getPlans, getStripeDashboardURL } from './api';
import PlanSubscribeModal from './PlanSubscribeModal';
import ManagePlanModal from './ManagePlanModal';

export default function PlanInfo({ userData, planData }) {
  const [loading, setLoading] = useState(false);
  const [showPlanSubscribeModal, setShowPlanSubscribeModal] = useState(false);
  const [showManagePlanModal, setShowManagePlanModal] = useState(false);
  const [plans, setPlans] = useState([]);

  const isPaying = planData.name !== 'No Card';

  const cardText = isPaying ?
    "Use the button on the left to update your subscription." :
    "We use Stripe to process payments. Click the 'Add Payment Method' button to upgrade your account.";

  const buttonText = isPaying ? "Manage Plan" : "Add Payment Method";

  const handleClick = async () => {
    try {
      setLoading(true);
      const plans = await getPlans();
      setPlans(plans.plans);

      if(isPaying) {
        setShowManagePlanModal(true);
      } else {
        setShowPlanSubscribeModal(true);
      }
      setLoading(false);
    } catch(_) {
      console.log(_);
      console.log(_.message);
      alert("Error: " + _.message);
      setLoading(false);
    }
  }

  const handleStripeDashboardClick = async () => {
    try {
      setLoading(true);
      const resp = await getStripeDashboardURL();
      
      if(resp.url) {
        window.location.href = resp.url;
      }
      setLoading(false);
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
            Plan
            <Button variant="primary" className="float-end" onClick={handleClick} disabled={loading}>{buttonText}</Button>
          </Card.Title>
          <Card.Text className="fs-6">
            {cardText}
            { isPaying ? <>
            {' '}To access your Stripe dashboard, click <a href="#" onClick={() => handleStripeDashboardClick()}>here</a>.
          </> : <></>}
          </Card.Text>
        </Card.Body>
      </Card>
      <PlanSubscribeModal show={showPlanSubscribeModal} plans={plans} onHide={() => setShowPlanSubscribeModal(false)}/>
      <ManagePlanModal show={showManagePlanModal} plans={plans} planName={planData.name} creditsPackages={userData.auto_purchase_credits_packages} onHide={() => setShowManagePlanModal(false)}/>
   </section>
  );
}