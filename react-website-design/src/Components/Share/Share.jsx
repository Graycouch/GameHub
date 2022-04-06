import "./Share.css"
import { PermMedia, VideoLibrary, Label, Room, EmojiEmotions, Cancel } from "@material-ui/icons"
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext"
import axios from "axios"

export default function Share() {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const description = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            description: description.current.value
        };

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.image = fileName;
            console.log(newPost);

            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err);
            }
        }

        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="Share">
            <div className="ShareWrapper">
                <div className="ShareTop">
                    <img className="ShareProfilePicture" src={user.profilePicture ? PublicFolder + user.profilePicture : PublicFolder + "person/noAvatar.png"} alt="" />
                    <input placeholder={"What's on your mind " + user.username + "?"} className="ShareInput" ref={description} />
                </div>
                <hr className="ShareHr" />
                {file &&(
                    <div className="ShareImageContainer">
                        <img className="ShareImage" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="ShareCancelImage" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="ShareBottom" onSubmit={submitHandler}>
                    <div className="ShareOptions">
                        <label htmlFor="file" className="ShareOption">
                            <PermMedia htmlColor="grey" className="ShareIcon" />
                            <span className="ShareOptionText">Photo</span>
                            <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <label htmlFor="file" className="ShareOption">
                            <VideoLibrary htmlColor="grey" className="ShareIcon" />
                            <span className="ShareOptionText">Video</span>
                            <input style={{ display: "none" }} type="file" id="file" accept=".mp4" onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="ShareOption">
                            <Label htmlColor="grey" className="ShareIcon" />
                            <span className="ShareOptionText">Tag</span>
                        </div>
                        <div className="ShareOption">
                            <Room htmlColor="grey" className="ShareIcon" />
                            <span className="ShareOptionText">Location</span>
                        </div>
                        <div className="ShareOption">
                            <EmojiEmotions htmlColor="grey" className="ShareIcon" />
                            <span className="ShareOptionText">Emojis</span>
                        </div>
                        <div className="ShareOption">
                            <button className="ShareButton">
                                <span className="ShareOptionText" type="submit">Share</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
