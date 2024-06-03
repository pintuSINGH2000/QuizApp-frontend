import React, { useEffect, useState } from "react";
import styles from "./questionanalysis.module.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionAnalysisData } from "../../api/quiz";
import moment from "moment";
import BufferingSpinner from "../BufferingSpinner/BufferingSpinner";

const QuestionAnalysis = () => {
  const { quizId } = useParams();
  const [analysisData, setAnalysisData] = useState({});
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const getQuestionAnalysisInitial = async () => {
      setLoader(true);
      const res = await getQuestionAnalysisData(quizId);
      if(res?.isUnauthorized){
        localStorage.clear();
        navigate("/login");
        return;
      }
      if(!res.result){
        navigate("/");
        return;
      }
      setAnalysisData(res?.result);
      setLoader(false);
    };
    getQuestionAnalysisInitial();
    // eslint-disable-next-line
  }, []);
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.analysis}>
      {loader ? (
          <div className={`${styles.spinner} flexbox-center`}>
            <BufferingSpinner />
          </div>
        ):(<>
        <div className={`${styles.header} poppins-600 flexbox-space-between`}>
          <div className={styles.left}>{analysisData.quizName} Question Analysis</div>
          <div className={styles.right}>
            <div>
              Created On : {moment.utc(analysisData.createdAt).format("Do MMM, YYYY")}
            </div>
            <div>Impression : {analysisData.impression}</div>
          </div>
        </div>
        {analysisData?.questions?.map((question, index) => (
          <div key={index} className={styles.questionContainer}>
            <div className={`${styles.questionName} poppins-500`}>
              Q.{index + 1} {question.questionName}
            </div>
            {analysisData.quizType === 1 ? (
              <div className={styles.answerAnalysis}>
                <div className={`${styles.answer} poppins-600 bg-white light-black text-center flexbox-center`}>
                  <div className={styles.count}>{question.attempted}</div>
                  <div className={styles.countTag}>
                    people Attempted the question
                  </div>
                </div>
                <div className={`${styles.answer} poppins-600 bg-white light-black text-center flexbox-center`}>
                  <div className={styles.count}>
                    {question.correctCount ? question.correctCount : 0}
                  </div>
                  <div className={styles.countTag}>
                    people Answered Correctly
                  </div>
                </div>
                <div className={`${styles.answer} poppins-600 bg-white light-black text-center flexbox-center`}>
                  <div className={styles.count}>
                    {question.attempted -
                      (question.correctCount ? question.correctCount : 0)}
                  </div>
                  <div className={styles.countTag}>
                    people Answered Incorrectly
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.voteContainer}>
                {question.options.map((option, ind) => (
                  <div key={ind} className={`${styles.vote} poppins-600 bg-white text-center`}>
                    <div className={styles.count}>{option.votes}</div>
                    <div className={styles.countTag}>option{ind+1}</div>
                  </div>
                ))}
              </div>
            )}
            {index < analysisData?.questions?.length - 1 && (
              <div className={styles.line}></div>
            )}
          </div>
        ))}
        </>)}
        
      </div>
    </div>
  );
};

export default QuestionAnalysis;
