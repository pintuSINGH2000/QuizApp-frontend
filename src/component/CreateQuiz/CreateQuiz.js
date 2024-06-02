import React, { useState } from "react";
import styles from "./createquiz.module.css";
import { Modal } from "antd";
import CreateQuestion from "../CreateQuestion/CreateQuestion";

const CreateQuiz = ({ cancel }) => {
  const [quizName, setQuizName] = useState("");
  const [quizType, setQuizType] = useState(0);
  const [quizDataErr, setQuizDataErr] = useState({
    quizNameErr: "",
    quizTypeErr: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuizSelect = (quizType) => {
    setQuizType(quizType);
  };
  const handleCancel = () => {
    setQuizName("");
    setQuizType(0);
    setQuizDataErr((prev) => ({ ...prev, quizNameErr: "" }));
    cancel();
  };
  const showModal = (openModal) => {
    let isValid = true;
    if (quizName.length === 0) {
      setQuizDataErr((prev) => ({ ...prev, quizNameErr: "Invalid quiz name" }));
      isValid = false;
    } else {
      setQuizDataErr((prev) => ({ ...prev, quizNameErr: "" }));
    }

    if (quizType === 0) {
      setQuizDataErr((prev) => ({ ...prev, quizTypeErr: "Select quiz type" }));
      isValid = false;
    } else {
      setQuizDataErr((prev) => ({ ...prev, quizTypeErr: "" }));
    }
    if (!isValid) return;
    setIsModalOpen(openModal);
    setQuizDataErr((prev) => ({ ...prev, quizNameErr: "" }));
    cancel();
  };

  const handleQuestionCancel = () => {
    showModal(false);
  };
  return (
    <div className={styles.container}>
      <input
        className={`${styles.quizName} border-radius-primary border-none poppins-500`}
        type="text"
        placeholder="Quiz Name"
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
      />
      {quizDataErr?.quizNameErr.length > 0 && (
        <p className={`${styles.error} poppins-500`}>
          {quizDataErr.quizNameErr}
        </p>
      )}
      <div className={`${styles.quizType} flexbox-space-between`}>
        <p className={`${styles.type} ${styles.font} poppins-500`}>Quiz Type</p>
        <button
          className={`${styles.btn} ${
            styles.font
          } border-none cursor-pointer border-radius-primary poppins-500 ${
            quizType === 1 ? styles.green : styles.normal
          }`}
          onClick={() => handleQuizSelect(1)}
        >
          Q & A
        </button>
        <button
          className={`${styles.btn} ${styles.font} border-none cursor-pointer border-radius-primary poppins-500 ${
            quizType === 2 ? styles.green : styles.normal
          }`}
          onClick={() => handleQuizSelect(2)}
        >
          Poll Type
        </button>
      </div>
      {quizDataErr?.quizTypeErr.length > 0 && (
        <p className={`${styles.error} poppins-500`}>
          {quizDataErr.quizTypeErr}
        </p>
      )}
      <div className={`${styles.footer} flexbox-space-between`}>
        <button
          className={`${styles.normal} ${styles.btns} border-none cursor-pointer poppins-500`}
          style={{ color: "rgba(71, 68, 68, 1)" }}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className={`${styles.green} ${styles.btns} border-none cursor-pointer poppins-500`}
          onClick={showModal}
        >
          Continue
        </button>
      </div>
      <Modal
        closable={false}
        footer={null}
        open={isModalOpen}
        className="modal"
        width={1000}
      >
        <CreateQuestion
          cancel={handleQuestionCancel}
          quizName={quizName}
          quizType={quizType}
          setQuizName={setQuizName}
          setQuizType={setQuizType}
        />
      </Modal>
    </div>
  );
};
export default CreateQuiz;
