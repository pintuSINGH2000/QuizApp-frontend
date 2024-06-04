import React, { useEffect, useState } from "react";
import styles from "./analytics.module.css";
import { deleteQuiz, getQuizAnalyticsData } from "../../api/quiz";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Loader/Loader";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoShareSocial } from "react-icons/io5";
import moment from "moment";
import { Modal } from "antd";
import DeleteModal from "../DeleteModal/DeleteModal";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import BufferingSpinner from "../BufferingSpinner/BufferingSpinner";
import { formatNumber } from "../../utils/numberFormatter";
import CreateQuestion from "../CreateQuestion/CreateQuestion";

const Analytics = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [quizToUpdate, setQuizToUpdate] = useState(null);
  const [quizTypeToUpdate, setQuizTypeToUpdate] = useState(null);
  const [loader, setLoader] = useState(false);
  const [deleteProcessing,setDeleteProcessing] = useState(false);
  const homepageUrl = window?.location?.origin;
  const navigate = useNavigate();

  const handleCopy = (quizId) => {
    navigator.clipboard
      .writeText(homepageUrl + "/quiz/" + quizId)
      .then(() => {
        toast.success("Link copied to Clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  useEffect(() => {
    const fetchInitial = async () => {
      setLoader(true);
      const res = await getQuizAnalyticsData(0, false);
      if (res?.isUnauthorized) {
        localStorage.clear();
        navigate("/login");
        return;
      }
      if (res) {
        setQuizzes((prevData) => [...prevData, ...res?.quizzes]);
        if (res?.quizzes.length < 12) {
          setHasMore(false);
        }
      }
      setLoader(false);
    };
    fetchInitial();
      //eslint-disable-next-line
  }, []);

  const fetchQuizAnalyticsData = async () => {
    try {
      const res = await getQuizAnalyticsData(quizzes.length, false);
      setQuizzes((prevData) => [...prevData, ...res?.quizzes]);
      if (res.quizzes?.length > 0) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const showCloseModal = (quizId) => {
    setQuizToDelete(quizId);
    setIsCloseModalOpen(true);
  };

  const handleCloseModalConfirm = async () => {
    if(deleteProcessing) return;
    setDeleteProcessing(true);
    const res = await deleteQuiz(quizToDelete);
    if (res) {
      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizToDelete));
    }
    setQuizToDelete(null);
    setIsCloseModalOpen(false);
    setDeleteProcessing(false);
  };

  const handleCloseModalCancel = () => {
    setQuizToDelete(null);
    setIsCloseModalOpen(false);
  };

  const showUpdateModal = (quizId, quizType) => {
    setQuizToUpdate(quizId);
    setQuizTypeToUpdate(quizType);
    setIsUpdateModalOpen(true);
  };
  const handleUpdateModalCancel = () => {
    setQuizToUpdate(null);
    setIsUpdateModalOpen(false);
  };
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.analytics} id="scrollableDiv">
        {loader ? (
          <div className={`${styles.spinner} flexbox-center`}>
            <BufferingSpinner />
          </div>
        ) : (
          <>
            <h1 className={`${styles.title} poppins-600`}>Quiz Analysis</h1>
            {quizzes.length === 0 ? (
              <div
                className={`${styles.emptyState} poppins-600 text-center light-black`}
              >
                <p>No Quizzes to display!</p>
                <p>Create some quiz to display quizzes analytics here!</p>
              </div>
            ) : (
              <InfiniteScroll
                dataLength={quizzes.length}
                next={() => fetchQuizAnalyticsData()}
                hasMore={hasMore}
                loader={<Loader />}
                scrollableTarget="scrollableDiv"
                endMessage={
                  <p className={`${styles.end} text-center poppins-600`}>
                    No More quizzes!
                  </p>
                }
                className={styles.infiniteScroll}
              >
                <table>
                  <thead>
                    <tr>
                      <th className={styles.firstCell}>S.no</th>
                      <th>Quiz Name</th>
                      <th>Created On</th>
                      <th>Impression</th>
                      <th></th>
                      <th className={styles.lastCell}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizzes?.map((quiz, index) => (
                      <tr
                        key={quiz._id}
                        className={index % 2 === 1 ? styles.odd:''}
                      >
                        <td className={styles.firstCell}>{index + 1}</td>
                        <td className={styles.quizName}>{quiz.quizName}</td>
                        <td>
                          {moment.utc(quiz.createdAt).format("Do MMM, YYYY")}
                        </td>
                        <td>{formatNumber(quiz.impression)}</td>
                        <td>
                          <TiEdit
                            className={`${styles.icon} ${styles.edit} cursor-pointer`}
                            onClick={() =>
                              showUpdateModal(quiz._id, quiz.quizType)
                            }
                          />
                          <RiDeleteBin6Fill
                            className={`${styles.icon} ${styles.delete} cursor-pointer`}
                            onClick={() => showCloseModal(quiz._id)}
                          />
                          <IoShareSocial
                            className={`${styles.icon} ${styles.share} cursor-pointer`}
                            onClick={() => handleCopy(quiz._id)}
                          />
                        </td>
                        <td className={`${styles.lastCell}`}>
                          <Link
                            to={`/analytic/${quiz._id}`}
                            className={`${styles.analysis} cursor-pointer`}
                          >
                            Question Wise Analysis
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </InfiniteScroll>
            )}
          </>
        )}

        <Modal
          closable={false}
          footer={null}
          open={isCloseModalOpen}
          width={1000}
        >
          <DeleteModal
            onCancel={handleCloseModalCancel}
            onConfirm={handleCloseModalConfirm}
          />
        </Modal>
        <Modal
          closable={false}
          footer={null}
          open={isUpdateModalOpen}
          className="modal"
          width={1000}
        >
          <CreateQuestion
            cancel={handleUpdateModalCancel}
            quiz={quizToUpdate}
            setQuizToUpdate={setQuizToUpdate}
            quizType={quizTypeToUpdate}
            isUpdating={true}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Analytics;
