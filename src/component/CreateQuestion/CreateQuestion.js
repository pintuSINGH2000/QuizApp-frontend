import React, { useEffect, useState } from "react";
import styles from "./createquestion.module.css";
import Question from "../Question/Question";
import { createQuiz, getQuestion, updateQuiz } from "../../api/quiz";
import { Modal } from "antd";
import Publish from "../Publish/Publish";
import { RiCloseLargeLine } from "react-icons/ri";
import { ToastContainer, Zoom, toast } from "react-toastify";

const CreateQuestion = ({
  quizName,
  quizType,
  cancel,
  setQuizName,
  setQuizType,
  isUpdating,
  quiz,
  setQuizToUpdate
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizId, setQuizId] = useState();
  const [optionType, setOptionType] = useState(1);
  const [questions, setQuestions] = useState([
    {
      questionName: "",
      options: [
        { text: "", imgUrl: "" },
        { text: "", imgUrl: "" },
      ],
      timer: 0,
      correctAns: -1,
    },
  ]);
  const [questionError, setQuestionError] = useState([{}]);
  const [index, setIndex] = useState(0);

  const handleQuestionClick = (index) => {
    setIndex(index);
  };

  const addQuestions = () => {
    if (questions.length >= 5) return;
    const newQuestion = {
      questionName: "",
      options: [
        { text: "", imgUrl: "" },
        { text: "", imgUrl: "" },
      ],
      correctAns: -1,
      timer: 0,
    };
    setQuestions([...questions, newQuestion]);
    setIndex(questions.length);
  };

  const removeQuestion = (ind) => {
    if (questions.length <= 1) return;
    const newQuestions = questions.filter((question, i) => i !== ind);
    setQuestions(newQuestions);
    const filteredErrors = questionError.filter(
      (error, i) => ind!==i
    );
    setQuestionError(filteredErrors);
    const newIndex = ind === newQuestions.length ? ind - 1 : ind;
    setIndex(newIndex);
  };

  const handleCancel = () => {
    reset();
    cancel();
  };

  const reset = () => {
    setQuestions([
      {
        questionName: "",
        options: [
          { text: "", imgUrl: "" },
          { text: "", imgUrl: "" },
        ],
        correctAns: -1,
        timer: 0,
      },
    ]);
    setOptionType(1);
    setIndex(0);
    setQuestionError([{}]);
    if (!isUpdating) {
      setQuizType(0);
      setQuizName("");
    }else{
      setQuizToUpdate(null);
    }
  };

  const handleSubmit = async () => {
    const errors = [];

    questions.forEach((question, qIndex) => {
      const questionErrors = {};

      //validate question
      if (!question.questionName) {
        questionErrors.questionName =
          quizType === 1 ? "Question is required" : "Poll Question is required";
      }

      // Validate options
      question.options.forEach((option, oIndex) => {
        let optionErrors;
        if (optionType === 1) {
          if (option.text.trim().length === 0) {
            optionErrors = "Please fill the options";
          }
          questions[qIndex].options[oIndex].imgUrl = "";
        }
        if (optionType === 2) {
          if (option.imgUrl.trim().length === 0) {
            optionErrors = "Please fill the options";
          }
          questions[qIndex].options[oIndex].text = "";
        }
        if (optionType === 3) {
          if (
            option.text.trim().length === 0 ||
            option.imgUrl.trim().length === 0
          ) {
            optionErrors = "Please fill the options";
          }
        }
        if (optionErrors) {
          questionErrors.optionsError = optionErrors;
          return;
        }
      });

      // Validate correctAns
      if (question.correctAns === -1 && quizType === 1) {
        questionErrors.correctAns =
          "Please select one correct answer from above options";
      }

      if (Object.keys(questionErrors).length > 0) {
        errors[qIndex] = questionErrors;
      }
    });
    if (errors.length > 0) {
      toast.error("Some field are missing",{containerId: 'question',});
      for(let errorIndex=0;errorIndex<questions.length;errorIndex++){
            if(!errors[errorIndex]){
              errors[errorIndex]='';
            }
      }
      setQuestionError(errors);
      return;
    }
    setQuestionError([{}]);
    if (isUpdating) {
      const res = await updateQuiz(quizId, {
        quizType,
        optionType,
        questions: questions,
      });
      if (res) {
        cancel();
        reset();
      }
    } else {
      const res = await createQuiz({
        quizName: quizName,
        quizType: quizType,
        optionType: optionType,
        questions,
      });
      if (res) {
        setQuizId(res);
        reset();
        cancel();
        setIsModalOpen(true);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // for updating
  useEffect(() => {
    const getQuestions = async () => {
      const res = await getQuestion(quiz);
      setQuizId(quiz);
      setOptionType(res?.optionType);
      setQuestions(res?.questions);
    };

    if (isUpdating) {
      getQuestions();
    }
}, [isUpdating,quiz,setQuizToUpdate,cancel]);

  return (
    <div className={styles.container}>
       <ToastContainer style={{position:"absolute",right:"1%"}} transition={Zoom}  enableMultiContainer containerId="question"/>
      <div className={`${styles.header} flexbox-space-between`}>
        <div className={`${styles.headerLeft} flexbox-center`}>
          {questions?.map((question, ind) => (
            <button
              key={ind}
              className={`${styles.question} border-none cursor-pointer bg-white`}
              onClick={(e) => handleQuestionClick(ind)}
            >
              {ind + 1}
              {ind === index && questions.length > 1 && (
                <p
                  className={`${styles.close} cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeQuestion(ind);
                  }}
                >
                  x
                </p>
              )}
            </button>
          ))}
          <button className={`${styles.add} bg-white border-none cursor-pointer`} onClick={addQuestions}>
            +
          </button>
        </div>
        <div className={`${styles.headerRight} poppins-500`}>Max 5 questions</div>
      </div>
      <Question
        index={index}
        questions={questions}
        setQuestions={setQuestions}
        quizType={quizType}
        optionType={optionType}
        setOptionType={setOptionType}
        questionError={questionError}
      />
      <div className={`${styles.footer} flexbox-space-between`}>
        <button
          className={`${styles.normal} bg-white ${styles.btns} poppins-600 border-none cursor-pointer`}
          style={{ color: "rgba(71, 68, 68, 1)" }}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className={`${styles.green} white ${styles.btns} poppins-600 border-none cursor-pointer`}
          onClick={handleSubmit}
        >
          {isUpdating?"Update":"Create"}{quizType === 1? " Quiz" : " Poll" }
        </button>
      </div>
      <Modal
        footer={null}
        onCancel={closeModal}
        open={isModalOpen}
        width={1000}
        style={{ position: "relative" }}
        closeIcon={<RiCloseLargeLine className={styles.icon} />}
        maskClosable={false}
      >
        <Publish quizId={quizId} />
      </Modal>
    </div>
  );
};

export default CreateQuestion;
