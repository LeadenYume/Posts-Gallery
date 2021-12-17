import { useNavigate } from "react-router";
import { useAppSelector } from "../../App/store"
import { PopUpArea } from "../../Shared/PopUpArea";
import { account } from "./AccountInfoSlice"
import styles from './AccountInfo.module.css';
import { api } from "../Network/Client";

export function AccountInfo() {
    const user = useAppSelector(account);
    const navigate = useNavigate();

    if (user.account) {
        return <PopUpArea
            showType='hover'
            priority='bottom'
            align={0.5}
            injected={
                <div className={styles.logOut}>
                    <div
                        className={styles.contextButton}
                        onClick={() => api.logOut()}
                    >
                        Settings
                    </div>
                    <div
                        className={styles.contextButton}
                        onClick={() => api.logOut()} 
                    >
                        Log out
                    </div>
                </div>
            }
        >
            <div>
                <span>Hi,{user.account.name}</span>
            </div>
        </PopUpArea>
    } else {

        return <button
            type="button"
            className="btn btn-light"
            onClick={() => navigate("/login")}
            
        >
            Log in
        </button>
    }

}