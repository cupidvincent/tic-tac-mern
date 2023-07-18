import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function GameModal({modalProps, toggleModal, endGameNow, nextRound}) {

    const [modalLocalProps, setModalLocalProps] = useState({
        title: '',
        message: '',
        visible: false
    })

    useEffect(() => {
        setModalLocalProps({...modalProps})
    },[modalProps])
  
    return (
      <>
        <Modal
          show={modalLocalProps.visible}
          onHide={toggleModal}
          backdrop="static"
          keyboard={false}
          centered={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>{modalLocalProps.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalLocalProps.message}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={endGameNow}>
              End Game
            </Button>
            <Button variant="primary" onClick={nextRound}>Next Round</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
