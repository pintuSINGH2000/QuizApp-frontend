import React from "react";
import styles from "./deletemodal.module.css";

const DeleteModal = ({onCancel,onConfirm}) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.header} poppins-600 light-black text-center`}>Are you confirm you want to delete ?</div>
      <div>
        <div className={`${styles.footer} flexbox-space-between`}>
          <button
            className={`${styles.red} ${styles.btns} white border-none cursor-pointer border-radius-primary poppins-600`}
            
            onClick={onConfirm}
          >
            Confirm Delete
            
          </button>
          <button
            className={`${styles.normal} ${styles.btns} bg-white light-black border-none cursor-pointer border-radius-primary poppins-600`}
            onClick={onCancel}
          >
           Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
