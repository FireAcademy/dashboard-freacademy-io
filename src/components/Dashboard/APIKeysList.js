import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import GenerateAPIKeyModal from './GenerateAPIKeyModal';
import ModifyAPIKeyModal from './ModifyAPIKeyModal';

export default function APIKeysList({apiKeys}) {
  const [showGenerateAPIKeyModal, setShowGenerateAPIKeyModal] = useState(false);
  const [modifyAPIKeyModalData, setModifyAPIKeyModalData] = useState(false); // hide if === false, else show

  if(!apiKeys) apiKeys = [];
  
  let tbody;
  if(apiKeys.length === 0) {
    tbody = (
      <tr>
        <th colSpan="7" className="text-center h4 pt-5 pb-5">
          Click on 'Generate' to create your first API key.
        </th>
      </tr>
    );
  } else {
    tbody = apiKeys.map(
      e => <APIKeyEntry
        key={e.api_key}
        name={e.name}
        apiKey={e.api_key}
        creditLimit={e.monthly_credit_limit}
        origin={e.origin}
        disabled={e.disabled}
        onModify = {() => setModifyAPIKeyModalData({
          name: e.name,
          apiKey: e.api_key,
          disabled: e.disabled,
          limit: e.monthly_credit_limit,
          origin: e.origin
        })}
      />
    );
  }

  return (
    <section className="mb-4">
      <Card>
        <Card.Body>
          <Card.Title>
            API Keys
            <Button variant="primary" className="float-end" onClick={() => setShowGenerateAPIKeyModal(true)}>Generate</Button>
          </Card.Title>
          <Card.Text className="fs-6">
            Don't know how to use these keys? Check out our
            {' '}<a href="https://docs.fireacademy.io/developers/using-api-keys" target="_blank" rel="noreferrer">docs</a>.
          </Card.Text>
          <Table borderless responsive>
            <thead className="bg-light text-center">
              <tr>
                <th>Name</th>
                <th>API Key</th>
                <th>Monthly Credit Limit</th>
                <th>Origin</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {tbody}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <GenerateAPIKeyModal show={showGenerateAPIKeyModal} onHide={() => setShowGenerateAPIKeyModal(false)} />
      <ModifyAPIKeyModal show={modifyAPIKeyModalData !== false} data={modifyAPIKeyModalData} onHide={() => setModifyAPIKeyModalData(false)} />
    </section>
  );
}

function APIKeyEntry({name, apiKey, creditLimit, origin, disabled, onModify}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);

    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <tr className="align-middle text-center">
      <td>{name}</td>
      <td>
        <OverlayTrigger placement="right" overlay={<Tooltip>
            {copied ? 'Copied!' : 'Click to copy'}
          </Tooltip>}
        >
          <Button variant="outline-secondary" size="sm" onClick={() => copyToClipboard()}>{apiKey}</Button>
        </OverlayTrigger>
      </td>
      <td>{creditLimit}</td>
      <td>{origin}</td>
      <td>
        <Badge bg={disabled ? 'secondary' : 'success'}>{disabled ? 'DISABLED' : 'ENABLED'}</Badge>
      </td>
      <td>
        <Button variant="outline-primary" onClick={onModify}>Modify</Button>
      </td>
    </tr>
  );
}