import Topbar from "../../Components/Topbar/Topbar";
import Leftbar from "../../Components/Leftbar/Leftbar";
import Feed from "../../Components/Feed/Feed";
import Rightbar from "../../Components/Rightbar/Rightbar";
import "./Profile.css"
import { useEffect, useRef, useState, useContext } from "react"
import axios from "axios"
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext"

export default function Profile() {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    const formDescription = useRef();
    const [profilePicture, setProfilePicture] = useState(null);
    const [coverPicture, setcoverPicture] = useState(null);
    const { user: currentUser } = useContext(AuthContext);
    const [profilePictureName, setProfilePictureName] = useState("");

    useEffect(() => {
        setProfilePictureName(currentUser.profilePicture);
    }, [currentUser])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        }
        fetchUser();
    }, [username]);

    const openForm = (e) => {
        e.preventDefault();
        document.getElementById("myForm").style.display = "block";
    }

    const closeForm = (e) => {
        e.preventDefault();
        document.getElementById("myForm").style.display = "none";
    }

    const submitProfileHandler = () => {
        const dataProfile = new FormData();
        const dataCover = new FormData();
        var profileName = "";
        var coverName = "";

        if (profilePicture) {
            const fileName = Date.now() + profilePicture.name;
            dataProfile.append("name", fileName);
            dataProfile.append("file", profilePicture);
            profileName = fileName;

            try {
                axios.post("/upload", dataProfile);
            } catch (err) {
                console.log(err);
            }
        }

        if (coverPicture) {
            const fileName = Date.now() + coverPicture.name;
            dataCover.append("name", fileName);
            dataCover.append("file", coverPicture);
            coverName = fileName;

            try {
                axios.post("/upload", dataCover);
            } catch (err) {
                console.log(err);
            }
        }

        try {
            axios.put("/users/" + user._id,
                {
                    userId: user._id,
                    description: formDescription.current.value,
                    profilePicture: profileName,
                    coverPicture: coverName
                });
            setProfilePictureName(profileName);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Topbar />
            <div className="ProfileContainer">
                <Leftbar />
                <div className="ProfileRight">
                    <div className="ProfileRightTop">
                        {user.username === currentUser.username && (
                            <div className="form-popup" id="myForm">
                                <form className="form-container">
                                    <label htmlFor="profilePicture"><b>Profile Picture: </b>
                                        <span className="pictureButton">Change Profile Picture</span>
                                        <input style={{ display: "none" }} type="file" id="profilePicture" accept=".png,.jpeg,.jpg" onChange={(e) => setProfilePicture(e.target.files[0])} />
                                    </label>

                                    <label htmlFor="coverPicture"><b>Cover Picture: </b>
                                        <span className="pictureButton">Change Cover Picture</span>
                                        <input style={{ display: "none" }} type="file" id="coverPicture" accept=".png,.jpeg,.jpg" onChange={(e) => setcoverPicture(e.target.files[0])} />
                                    </label>

                                    <label><b>Description: </b>
                                        <input type="text" placeholder="Enter Description" ref={formDescription} />
                                    </label>
                                    <button type="submit" className="button" onClick={submitProfileHandler}>Submit</button>
                                    <button type="button" className="button cancel" onClick={closeForm}>Close</button>
                                </form>
                            </div>
                        )}
                        <div className="ProfileCover">
                            <button className="CoverPictureButton" onClick={openForm}>
                                <img className="ProfileCoverPicture" src={user.coverPicture ? PublicFolder + user.coverPicture : PublicFolder + "person/noCover.jpg"} alt="" />
                            </button>
                            <button className="ProfilePictureButton" onClick={openForm}>
                                <img className="ProfilePicture" src={user.profilePicture ? PublicFolder + user.profilePicture : PublicFolder + "person/noAvatar.png"} alt="" />
                            </button>
                        </div>
                        <div className="ProfileInformation">
                            <h4 className="ProfileInformationName">{user.username}</h4>
                            <span className="ProfileInformationDescription">{user.description}</span>
                        </div>
                    </div>
                    <div className="ProfileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}
