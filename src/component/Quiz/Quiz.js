import React, { useEffect, useRef, useState } from "react";
import styles from "./quiz.module.css";
import { Tooltip } from "antd";
import { feedbackApi, getQuizData } from "../../api/quiz";
import { useParams } from "react-router-dom";
import Success from "../Success/Success";
import QuizTimer from "../QuizTimer/QuizTimer";
import BufferingSpinner from "../BufferingSpinner/BufferingSpinner";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [questionNo, setQuestionNo] = useState(0);
  const [loader, setLoader] = useState(true);
  const [ans, setAns] = useState([]);
  const [curAns, setCurAns] = useState(-1);
  const { quizId } = useParams();
  const [quizType, setQuizType] = useState(1);
  const [optionType,setOptionType] = useState();
  const [score, setScore] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const curAnsRef = useRef(curAns);

  useEffect(() => {
    curAnsRef.current = curAns;
  }, [curAns]);

  useEffect(() => {
    const getQuiz = async () => {
      setLoader(true);
      const res = await getQuizData(quizId);
      if (res) {
        setQuestions(res?.questions);
        setQuizType(res?.quizType);
        setOptionType(res?.optionType);
        setAns(Array(res?.questions.length).fill(-1));
      }
      setLoader(false);
    };
    getQuiz();
     //eslint-disable-next-line
  }, []);

  const getTime = (time) => {
    if (time === 1) {
      return 5;
    } else if (time === 2) {
      return 10;
    } else {
      return 0;
    }
  }
  const handleSubmit = async () => {
    const curansArray=ans;
    curansArray[questionNo]=curAnsRef.current;;
    setAns(curansArray);
    if (questionNo < questions.length - 1) {
      setCurAns(-1);
    } else {
      setLoader(true);
      const res = await feedbackApi(quizId, quizType, ans);
      if (res) {
        setScore(res);
      }
      setLoader(false);
    }
    setResetKey(prevKey => prevKey + 1);
    setQuestionNo(questionNo + 1);
  };
  return (
    <div className={`${styles.container} flexbox-center`}>
      <div className={`${styles.card} bg-white border-radius-primary`}>
        {loader?<div className={`${styles.spinner} flexbox-center`}><BufferingSpinner /></div> :(
          <>
          {questionNo < questions?.length ? (
            <>
              <header className={`${styles.header} poppins-700 flexbox-space-between`}>
                <div className="light-black">
                  0{questionNo + 1}/0{questions.length}
                </div>
                {questions[questionNo]?.timer > 0 && (
                    <QuizTimer  duration={getTime(questions[questionNo]?.timer)} resetKey={resetKey} onTimeUp={handleSubmit} styles={styles.timer} />
                )}
              </header>
              <main>
                <div className={`${styles.questionsName} text-center light-black poppins-700`}>
                  {questions[questionNo].questionName}
                </div>
                <div className={`${styles.options} ${optionType===1&& styles.option1}`}>
                  {questions[questionNo]?.options?.map((option, index) =>
                    optionType === 1 ? (
                      <Tooltip
                        placement="top"
                        title={option.text}
                        trigger={window.cordova ? "click" : "hover"}
                        key={index}
                        style={{overflow:"auto",height:"200px"}}
                      >
                        <button
                          className={`${styles.textOption} ellipsis border-none cursor-pointer poppins-600 ${
                            curAns === index && styles.ans
                          }`}
                          onClick={() => setCurAns(index)} lang="de"
                        >
                          {option.text}
                        </button>
                      </Tooltip>
                    ) : optionType === 2 ? (
                      <button
                        className={`${styles.imageOption} border-none cursor-pointer ${
                          curAns === index && styles.ans
                        }`}
                        onClick={() => setCurAns(index)}
                         key={index}
                      >
                        <img
                          className={styles.options2}
                          src={option?.imgUrl}
                          alt="Options"
                        />
                      </button>
                    ) : (
                      <button
                        className={`${styles.textandimgOption} border-none cursor-pointer ${
                          curAns === index && styles.ans
                        } ${quizType === 2 && styles.polloption3}`}
                        onClick={() => setCurAns(index)}
                        key={index}
                      >
                        <Tooltip
                          placement="top"
                          title={option.text}
                          trigger={window.cordova ? "click" : "hover"}
                          className={`${styles.textandimgOption} ${styles.tooltipoption3}`}
                        >
                          <p className={`${styles.option3text} poppins-600 ellipsis ${quizType === 2 && styles.polloption3text}`} lang="de">{option.text}</p>
                        <img
                          className={`${styles.options3} ${quizType === 2 && styles.polloption3img}`}
                          src={option?.imgUrl}
                          alt="Options"
                        />
                         </Tooltip>
                      </button>
                    )
                  )}
                </div>
              </main>
              <footer>
                <button className={`${styles.footer} white border-radius-primary poppins-600 flexbox-center cursor-pointer border-none text-center`} onClick={()=>handleSubmit()}>
                  {questionNo === questions.length - 1 ? "Submit" : "NEXT"}
                </button>
              </footer>
            </>
          ) : quizType === 1 ? (
            <Success quizType={quizType} score={score} qlength={questionNo} />
          ) : (
            <Success quizType={quizType} />
          )}
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
