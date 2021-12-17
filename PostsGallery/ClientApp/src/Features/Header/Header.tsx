import { useNavigate } from "react-router";
import { AccountInfo } from "../AccountInfo/AccountInfo";
import styles from "./Header.module.css";

export function Header() {
    const navigate = useNavigate();;

    return <div className={styles.main}>
        <div
            className="font-weight-bold"
            onClick={() => navigate("/")}
        >
            <h4 className={styles.logo} >Posts</h4>
        </div>
        <div><AccountInfo /></div>
    </div>
}