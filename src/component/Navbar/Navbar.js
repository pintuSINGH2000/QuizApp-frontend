import React, { useState } from "react";
import styles from "./navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import CreateQuiz from "../CreateQuiz/CreateQuiz";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const showModal = (openModal) => {
    setIsModalOpen(openModal);
  };

  const handleModalCancel = () => {
    showModal(false);
  };
  const handleLogout = () => {
     localStorage.clear();
     toast("Logout Successfully");
     navigate("/login");
  }
  return (
    <div className={`${styles.container} text-center`}>
      <h1 className={styles.title}>QUIZZIE</h1>
      <div className={`${styles.navigation} poppins-700`}>
        <NavLink
          activeclassname="active"
          className={`${styles.navbtns} cursor-pointer light-black`}
          to="/"
        >
          Dashboard
        </NavLink>
        <NavLink
          activeclassname="active"
          className={`${styles.navbtns} cursor-pointer light-black`}
          to="/analytic"
        >
          Analytics
        </NavLink>
        <div className={`${styles.navbtns} cursor-pointer light-black`} onClick={showModal}>
          Create Quiz
        </div>
      </div>
      <div className={`${styles.footer} poppins-700 flexbox-center`}>
        <div className={styles.line}></div>
        <span className="cursor-pointer" onClick={handleLogout}>Logout</span>
      </div>
      <Modal
        closable={false}
        footer={null}
        open={isModalOpen}
        width={800}
      >
        <CreateQuiz cancel={handleModalCancel} />
      </Modal>
    </div>
  );
};

export default Navbar;
