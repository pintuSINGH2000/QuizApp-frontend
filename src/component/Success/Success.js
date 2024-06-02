import React from 'react';
import success from '../../assest/Images/success.png';
import styles from './success.module.css'

const Success = ({quizType,score,qlength}) => {
  return (
    <div className={`${styles.container} flexbox-center text-center`}>
      {quizType ===1?(
         <div className={`${styles.quizCard} flexbox-center`}>
         <h1 className={`${styles.quizHeader} light-black poppins-700`}>Congrats Quiz is completed</h1>
         <img src={success}  alt='award'/>
         <h1 className={`${styles.quizHeader} poppins-700`}>Your Score is <span className={styles.score}>0{score}/0{qlength}</span></h1>
         </div>
      ):(<div className={`${styles.quizHeader} poppins-700 ${styles.poll} text-center`}>Thank you 
        for participating in the Poll</div>)}
    </div>
  )
}

export default Success