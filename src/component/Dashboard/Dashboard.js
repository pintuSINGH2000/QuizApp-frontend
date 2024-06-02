import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { getQuizAnalyticsData } from "../../api/quiz";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader/Loader";
import Navbar from "../Navbar/Navbar";
import BufferingSpinner from "../BufferingSpinner/BufferingSpinner";
import { formatNumber } from "../../utils/numberFormatter";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [totalImpression, setTotalImpression] = useState(0);
  const [totalQuestionsCreated, setTotalQuestionCreated] = useState(0);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitial = async () => {
      setLoader(true);
      const res = await getQuizAnalyticsData(0, true);
      if (res?.isUnauthorized) {
        localStorage.clear();
        navigate("/login");
        return;
      }
      if (res) {
        setTotalQuizzes(res?.totalQuizCreated);
        setTotalImpression(res?.totalImpression);
        setTotalQuestionCreated(res?.totalQuestionsCreated);
        if (res?.quizzes) {
          setQuizzes((prevData) => [...prevData, ...res.quizzes]);
          if (res.quizzes.length < 12) {
            setHasMore(false);
          }
        }
      }
      setLoader(false);
    };
    fetchInitial();
    //eslint-disable-next-line
  }, []);

  const fetchQuizAnalyticsData = async () => {
    try {
      const res = await getQuizAnalyticsData(quizzes.length, true);
      setQuizzes((prevData) => [...prevData, ...res?.quizzes]);
      if (res?.quizzes?.length > 0) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.dashboard} id="scrollableDiv">
        {loader ? (
          <div className={`${styles.spinner} flexbox-center`}>
            <BufferingSpinner />
          </div>
        ) : (
          <>
            <div className={`${styles.performance} flexbox-center`}>
              <div
                className={`${styles.orange} ${styles.performanceCard} border-radius-primary bg-white poppins-700`}
              >
                <span className={styles.count}>
                  {formatNumber(totalQuizzes)}{" "}
                </span>{" "}
                Quiz Created
              </div>
              <p
                className={` ${styles.green} ${styles.performanceCard} border-radius-primary bg-white poppins-700`}
              >
                <span className={styles.count}>
                  {formatNumber(totalQuestionsCreated)}{" "}
                </span>
                questions Created
              </p>
              <div
                className={` ${styles.blue} ${styles.performanceCard} border-radius-primary bg-white poppins-700`}
              >
                <span className={styles.count}>
                  {formatNumber(totalImpression)}{" "}
                </span>{" "}
                Total Impressions
              </div>
            </div>

            <div className={styles.trendingQuiz}>
              <div className={`${styles.title} light-black poppins-600`}>
                Trending Quizs
              </div>
              {quizzes.length === 0 ? (
                <div
                  className={`${styles.emptyState} text-center light-black poppins-600`}
                >
                  <p>No Quiz in Trending!</p>
                  <p>🚀 Share Your Quiz to Get Featured in Trending! 🚀</p>
                </div>
              ) : (
                <InfiniteScroll
                  dataLength={quizzes.length}
                  next={() => fetchQuizAnalyticsData()}
                  hasMore={hasMore}
                  loader={<Loader />}
                  scrollableTarget="scrollableDiv"
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>No More quizzes!</b>
                    </p>
                  }
                >
                  <div className={styles.quizContainer}>
                    {quizzes?.map((quiz, index) => (
                      <div
                        key={quiz._id}
                        className={`${styles.quizCard} bg-white`}
                      >
                        <div className="flexbox-space-between">
                          <div
                            className={`${styles.quizName} poppins-600 ellipsis`}
                          >
                            {quiz.quizName}
                          </div>
                          <div className={`${styles.impression} poppins-600`}>
                            <div>{formatNumber(quiz.impression)}</div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 48 48"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={4}
                              >
                                <path
                                  strokeLinejoin="round"
                                  d="M24 41c9.941 0 18-8.322 18-14c0-5.678-8.059-14-18-14S6 21.328 6 27c0 5.672 8.059 14 18 14Z"
                                  clipRule="evenodd"
                                />
                                <path
                                  strokeLinejoin="round"
                                  d="M24 33a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"
                                />
                                <path
                                  strokeLinecap="round"
                                  d="m13.264 11.266l2.594 3.62m19.767-3.176l-2.595 3.62M24.009 7v6"
                                />
                              </g>
                            </svg>
                          </div>
                        </div>
                        <div className={`${styles.created} poppins-600`}>
                          Created on : {moment.utc(quiz.createdAt).format("Do MMM, YYYY")}
                        </div>
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
