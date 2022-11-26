import React, { createContext, useEffect, useState } from 'react';
import DashboardNavbar from './DashboardNavbar';
import Stats from './Stats';
import Container from 'react-bootstrap/Container';
import APIKeysList from './APIKeysList';
import PaymentInfo from './PaymentInfo';
import LoadingIndicator from '../LoadingIndicator';
import { getDashboardData } from './api';

function useAPIKeysAndUserData() {
  const [theSwtich, setTheSwitch] = useState(true);
  const [loading, setLoading] = useState(true);
  const [apiKeysMaybe, setApiKeysMaybe] = useState(undefined);
  const [userDataMaybe, setUserDataMaybe] = useState(undefined);

  const triggerRefresh = () => setTheSwitch(!theSwtich);
  useEffect(() => {
    const f = () => getDashboardData().then(r => {
      setApiKeysMaybe(r.api_keys);
      setUserDataMaybe(r.user);
      setLoading(false);
    });

    f();
    const intervalId = setInterval(f, 5000);

    return () => clearInterval(intervalId);
  }, [theSwtich]);

  const apiKeys = apiKeysMaybe === undefined || apiKeysMaybe === null ? [] : apiKeysMaybe;
  const userData = userDataMaybe === undefined || userDataMaybe === null ? {} : userDataMaybe;

  return [triggerRefresh, loading, apiKeys, userData];
}

export const TriggerRefreshContext = createContext(() => {});

export default function Dashboard() {
  const [triggerRefresh, loading, apiKeys, userData] = useAPIKeysAndUserData();

  if(loading) {
    return <LoadingIndicator />
  }

  const enabledApiKeys = apiKeys.filter((e) => !e.disabled).length;
  const totalWeeklyCreditUsage = apiKeys.reduce((prevVal, nextVal) => prevVal + nextVal.credits_used_this_week, 0);
  const freeCreditsRemaining = apiKeys.length === 0 ? 4200000 : apiKeys.reduce((prevVal, nextVal) => prevVal + nextVal.free_credits_remaining, 0);
  return(
    <TriggerRefreshContext.Provider value={triggerRefresh}>
      <div id="wrapper">
      <DashboardNavbar apikeys={apiKeys} />
        <Container>
          <Stats apiKeys={apiKeys.length} enabledApiKeys={enabledApiKeys} totalWeeklyCreditUsage={totalWeeklyCreditUsage} freeCreditsRemaining={freeCreditsRemaining} />
          <APIKeysList apiKeys={apiKeys}/>
          <PaymentInfo userData={userData}/>
        </Container>
      </div>
    </TriggerRefreshContext.Provider>
  );
}

