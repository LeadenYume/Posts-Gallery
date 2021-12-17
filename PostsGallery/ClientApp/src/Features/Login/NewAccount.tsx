import classNames from 'classnames';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { NewUserRequest } from '../../csts';
import { api } from '../Network/Client';
import styles from './Login.module.css';

export function NewAccount() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [warning, setWarning] = useState(false);
    const onSubmit = async (data: NewUserRequest) => {
        const result = await api.createAccount(data);
        setWarning(!result);
    }

    return <div className={styles.wrapper}>
        <div className={styles.main}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input {...register("name")} type="text" className="form-control" />
                </div>
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
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
                {warning && <div className="text-danger">Login already exist</div>}
            </form>

            <div className={styles.contextRow}>
                Already have an account?
                <button
                    type="button"
                    className={classNames("btn btn-link ", styles.contextButton)}
                    onClick={() => navigate('/login')}
                >
                    Sign in now
                </button>
                .
            </div>
        </div>
    </div>

}