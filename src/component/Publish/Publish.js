import React, { useState } from "react";
import styles from "./publish.module.css";
import { ToastContainer, Zoom, toast } from "react-toastify";

const Publish = ({quizId}) => {
  const homepageUrl = window?.location?.origin;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(homepageUrl+"/quiz/"+quizId)
      .then(() => {
        toast.success("Link copied to Clipboard",{containerId: 'publish',});
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  return (
    <div className={`${styles.container} flexbox-center`}>
        <ToastContainer style={{position:"absolute",right:"1%"}} transition={Zoom}  enableMultiContainer containerId="publish"/>
      <h1 className={`${styles.h1} light-black poppins-600 text-center`}>Congrats your Quiz is Published!</h1>
      <button className={`${styles.link} poppins-600 border-none light-black border-radius-primary`}>{homepageUrl+"/quiz/"+quizId}</button>
      <button className={`${styles.share} poppins-600 white border-radius-primary border-none cursor-pointer`} onClick={handleCopy}>share</button>
     
    </div>
  );
};

export default Publish;
