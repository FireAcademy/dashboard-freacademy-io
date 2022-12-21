import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { getUpdates, acknowledgeUpdates } from './api';
import toast from 'react-hot-toast';

export default function UpdatesModal() {
  const [loading, setLoading] = useState(false);
  const [updates, setUpdates] = useState(undefined);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if(updates === undefined) {
      getUpdates().then(response => {
            const updates = response["updates"];
            setUpdates(updates ?? []);
            if(updates.length !== undefined && updates.length > 0) {
                setShowModal(true);
            }
        }).catch(() => setUpdates([]));
    }
  }, [updates]);

  const onSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    try {
      await acknowledgeUpdates();
    } catch (_) {
      console.log(_.message);
    }
        
    setLoading(false);
    setShowModal(false);
    toast.success('Updates acknowledged.');
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
            <center className="h4 mb-4">Updates From the FireAcademy.io Team</center>
            {(updates ?? []).map(update => (
              <Card key={update.title} className="mt-2">
                <Card.Body>
                  <Card.Title className="text-center">{update.name}</Card.Title>
                  <Card.Subtitle className="text-center">{update.title}</Card.Subtitle>
                  <Card.Text className="mt-3">
                    {update.description}{' '}
                    <Card.Link href={update.learn_more_link} className="mb-4">Learn More</Card.Link>
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