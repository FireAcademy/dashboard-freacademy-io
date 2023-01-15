import React, { createContext, useEffect, useState } from 'react';
import DashboardNavbar from './DashboardNavbar';
import Stats from './Stats';
import Container from 'react-bootstrap/Container';
import APIKeysList from './APIKeysList';
import PaymentInfo from './PaymentInfo';
import LoadingIndicator from '../LoadingIndicator';
import FeedbackButton from './FeedbackButton';
import { getDashboardData } from './api';
import UpdatesModal from './UpdatesModal';

function useAPIKeysAndUserData() {
  const [theSwtich, setTheSwitch] = useState(true);
  const [loading, setLoading] = useState(true);
  const [apiKeysMaybe, setApiKeysMaybe] = useState(undefined);
  const [userDataMaybe, setUserDataMaybe] = useState(undefined);
  const [planDataMaybe, setPlanDataMaybe] = useState(undefined);

  const triggerRefresh = () => setTheSwitch(!theSwtich);
  useEffect(() => {
    const f = () => getDashboardData().then(r => {
      setApiKeysMaybe(r.api_keys);
      setUserDataMaybe(r.user);
      setPlanDataMaybe(r.plan);
      setLoading(false);
    });

    f();
    const intervalId = setInterval(f, 5000);

    return () => clearInterval(intervalId);
  }, [theSwtich]);

  const apiKeys = apiKeysMaybe === undefined || apiKeysMaybe === null ? [] : apiKeysMaybe;
  const userData = userDataMaybe === undefined || userDataMaybe === null ? {} : userDataMaybe;
  const planData = planDataMaybe === undefined || planDataMaybe === null ? {} : planDataMaybe;

  return [triggerRefresh, loading, apiKeys, userData, planData];
}

export const TriggerRefreshContext = createContext(() => {});

export default function Dashboard() {
  const [triggerRefresh, loading, apiKeys, userData, planData] = useAPIKeysAndUserData();

  if(loading) {
    return <LoadingIndicator />
  }

  const remainingCredits = userData.remaining_credits;
  const planName = planData.name;
  const billingCycleEnd = userData.billing_cycle_end;
  const extraCreditsEnabled = planData.auto_purchase_credits_packages;
  return(
    <TriggerRefreshContext.Provider value={triggerRefresh}>
      <div id="wrapper">
        <DashboardNavbar apikeys={apiKeys} />
        <Container>
          <Stats
            remainingCredits={remainingCredits}
            billingCycleEnd={billingCycleEnd}
            apiKeys={apiKeys}
            plan={planName}
            extraCreditsEnabled={extraCreditsEnabled}
          />
          <APIKeysList apiKeys={apiKeys}/>
          <PaymentInfo userData={userData}/>
        </Container>
        <FeedbackButton></FeedbackButton>
        <UpdatesModal></UpdatesModal>
      </div>
    </TriggerRefreshContext.Provider>
  );
}

