import "./Post.css"
import { MoreVert } from "@material-ui/icons"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { format } from "timeago.js";
import { Link } from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext";

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId]);

    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", { userId: currentUser._id })
        } catch (err) {

        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    return (
        <div className="Post">
            <div className="PostWrapper">
                <div className="PostTop">
                    <div className="PostTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img className="PostProfilePicture" src={user.profilePicture ? PublicFolder + user.profilePicture : PublicFolder + "person/noAvatar.png"} alt="" />
                        </Link>
                        <Link to={`profile/${user.username}`} style={{ textDecoration: "none" }}>
                            <span className="PostUsername">{user.username}</span>
                        </Link>
                        <span className="PostDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="PostTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="PostCenter">
                    <span className="PostText">{post?.description}</span>
                    <img className="PostImage" src={PublicFolder + post.image} alt="" />
                </div>
                <div className="PostBottom">
                    <div className="PostBottomLeft">
                        <img className="LikeButton" src={`${PublicFolder}like.png`} onClick={likeHandler} alt="" />
                        <img className="LikeButton" src={`${PublicFolder}heart.png`} onClick={likeHandler} alt="" />
                        <span className="PostLikeCounter">{like} People Liked this Post!</span>
                    </div>
                    <div className="PostBottomRight">
                        <span className="PostCommentText">{post.comment} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
