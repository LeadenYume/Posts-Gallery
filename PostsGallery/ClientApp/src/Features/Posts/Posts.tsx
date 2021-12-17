import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../App/store";
import { AddPostRequest } from "../../csts";
import { PostComponent } from "./Post";
import { postsSelector } from "./PostsSlice";
import styles from './Posts.module.css';
import { api } from "../Network/Client";

export function Posts() {
    const posts = useAppSelector(postsSelector);
    const { register, handleSubmit } = useForm();
    const [warning, setWarning] = useState(false);
    const onSubmit = async (data: AddPostRequest) => {
        const result = await api.addPost(data);
        setWarning(!result);
    }
    return <div className={styles.wrapper}>
        <div className={styles.main}>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <h5>Tell us something</h5>
                        <textarea {...register("content")} rows={6} className="form-control" />
                    </div>

                    <div className={styles.row}>
                        <div className="">
                            {warning && <div className="text-danger">Please log in.</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Publish</button>
                    </div>
                    
                </form>
            </div>
            <br/>
            <div>{
                posts.posts.map(post => <PostComponent post={post} />)
            }</div>
        </div>
    </div>
}



