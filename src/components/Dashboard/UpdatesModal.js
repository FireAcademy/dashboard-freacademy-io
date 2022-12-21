import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export async function fetchUpdates() {
  console.log('mocking fetch updates...');

  await new Promise(r => setTimeout(r, 250));
  return [
    {
        id: 0,
        name: "The Kraken Update",
        title: "Faster and Cheaper RPC Calls",
        description: "Our service is back up! We've significantly re-designed our infrastructure: we can deploy it to any cloud (not just DigitalOcean), everything is faster, and, more importantly, RPC calls are 20x cheaper (10,000 RPC calls cost just $1). New APIs will extremely easy to add in the future. Traffic has been renamed to credits.",
        learn_more_link: "https://blog.kuhi.to/release-the-kraken"
    },
    {
        id: 1,
        name: "The Beta Update",
        title: "Singleton Data At Your Fingertips",
        description: "RPC calls are not enough - we've started parsing the Chia blockchain. A new API for querying information about singletons has been added. The pricing is based on results, with one result costing only 42 credits.",
        learn_more_link: "https://blog.kuhi.to/beta"
    },
    {
        id: 2,
        name: "The Unicorn Update",
        title: "Our Users Matter",
        description: "We have so many ideas, yet our time is limited. In an effort to prioritize those ideas and even get new ones, we decided to make it easier for our users to get their voices heard. Starting now, you can send us a message (feedback, questions, suggestions, or just 'hi') by pressing the unicorn emoji on your dashboard. We will also notify you of updates via this pop-up thingy.",
        learn_more_link: "https://blog.kuhi.to/"
    },
  ];
};

export default function UpdatesModal() {
  const [loading, setLoading] = useState(false);
  const [updates, setUpdates] = useState(undefined);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if(updates === undefined) {
        fetchUpdates().then(updates => {
            setUpdates(updates);
            if(updates.length !== undefined) {
                setShowModal(true);
            }
        }).catch(() => setUpdates([]));
    }
  }, [updates]);

  const onSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    try {
      console.log('marking everything as read...');
      await new Promise(r => setTimeout(r, 2000));
    } catch (_) {
      console.log(_.message);
    }
        
    setLoading(false);
    setShowModal(false);
  }

  return (
    <Modal
      onHide={() => setShowModal(false)}
      show={showModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      fullscreen="sm-down"
      centered
    >
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Since You've Been Gone...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <center class="h4 mb-4">Updates From the FireAcademy.io Team</center>
            {(updates ?? []).map(update => (
              <Card className="mt-2">
                <Card.Body>
                  <Card.Title className="text-center">{update.name}</Card.Title>
                  <Card.Subtitle className="text-center">{update.title}</Card.Subtitle>
                  <Card.Text class="mt-3">
                    {update.description}{' '}
                    <Card.Link href={update.learn_more_link} class="mb-4">Learn More</Card.Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)} variant="outline-secondary" disabled={loading}>Dismiss</Button>
          <Button type="submit" disabled={loading}>{loading ? 'Acknowledging...' : 'Acknowledge'}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}