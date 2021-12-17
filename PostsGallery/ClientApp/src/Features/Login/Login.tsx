import classNames from 'classnames';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { AuthenticateRequest } from '../../csts';
import { api } from '../Network/Client';
import styles from './Login.module.css';

//<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>

export function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [warning, setWarning] = useState(false);
    const onSubmit = async (data: AuthenticateRequest) => {
        const result = await api.authenticate(data);
        setWarning(!result);
        if (result) {
            navigate('/');
        }
    }

    return <div className={styles.wrapper}>
        <div className={styles.main}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Login</label>
                    <input {...register("login")} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input {...register("password")} type="password" className="form-control" />
                </div>
                <div className={styles.row}>
                    <div className="form-check">
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
                {warning && <div className="text-danger">incorrect password or login</div>}
            </form>

            <div className={styles.contextRow}>
                Don't have an account?
                <button
                    type="button"
                    className={classNames("btn btn-link ", styles.contextButton)}
                    onClick={() => navigate('/register')}
                >
                    Register now
                </button>
                .
            </div>
        </div>
    </div>
}