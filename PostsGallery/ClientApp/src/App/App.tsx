import { Route, Routes } from 'react-router';
import { Header } from '../Features/Header/Header';
import { Login } from '../Features/Login/Login';
import { NewAccount } from '../Features/Login/NewAccount';
import { Posts } from '../Features/Posts/Posts';
import styles from './App.module.css';


function App() {
    return (
        <div className={styles.app}>
            <Header />
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<NewAccount />} />
            </Routes>
        </div>
    );
}

export default App;
