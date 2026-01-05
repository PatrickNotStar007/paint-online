import React, { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import canvasState from "../store/canvasState.ts";

const ModalWindow = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const [modal, setModal] = useState(true);

  const connectHandler = () => {
    if (!usernameRef.current) return;
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
  };

  return (
    <Modal show={modal} onHide={() => {}}>
      <Modal.Header>
        <Modal.Title>Введите ваше имя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" ref={usernameRef} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => connectHandler()}>
          Войти
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWindow;
