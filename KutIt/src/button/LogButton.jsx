import styles from "./LogButton.module.css"
import { useNavigate } from "react-router";

export default function LogButton({buttonTitle, link}) {

     const navigate = useNavigate(); 

  const goToAbout = () => {
    navigate(link);
  };
    return(
        <>
        <button className={styles.logbutton} onClick={goToAbout}>{buttonTitle}</button>
        </>
    )
}