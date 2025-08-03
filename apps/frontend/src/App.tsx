import { useState } from "react";
import Nav from "./nav/Nav";
import Login from "./nav/Login";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Nav onLoginClick={openModal} />
      {showModal && <Login onClose={closeModal} />}
    </>
  );
}

export default App;
