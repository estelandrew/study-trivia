import { ReactNode } from "react";
import styles from "./Flashcard.module.scss";
import "./styles.css";

type FlashCardPropsType = {
  showBreadcrumbs: boolean;
};

const Flashcard = ({ showBreadcrumbs }: FlashCardPropsType) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Avatar"
            style={{ width: "300px", height: "300px" }}
          />
        </div>
        <div className="flip-card-back">
          <h1>John Doe</h1>
          <p>Architect & Engineer</p>
          <p>We love that guy</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;

// <div className={styles.container}>
//       <div className={`${styles.edge} history`}></div>
//       <div className={styles.mainArea}>
//         {showBreadcrumbs && (
//           <div className={styles.breadcrumbs}>
//             <a href="#">History</a>&nbsp;&gt;&nbsp;
//             <a href="#">Presidents</a>
//           </div>
//         )}
//         <div className={styles.mainText}>
//           16th President of the United States
//         </div>
//       </div>
//     </div>
