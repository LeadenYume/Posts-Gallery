import { Post } from "../../csts";
import styles from './Posts.module.css';


export interface PostProps {
    post: Post
}

export function PostComponent(props: PostProps) {
    return <div className={styles.post}>
        <div className={styles.postName}>{props.post.user.name}</div>
        <div>{props.post.content}</div>
    </div>;
}
