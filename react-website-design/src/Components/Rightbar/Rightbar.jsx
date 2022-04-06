import "./Rightbar.css"
import Online from "../Online/Online"
import { Users } from "../../DummyData"
import { axios } from "axios"
import { useEffect, useState, useContext, useRef } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const axios = require('axios');
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(
        currentUser.following.includes(user?.id)
    );

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user]);

    const handleClick = async () => {
        try {
            if (followed) {
                await axios.put(`/users/${user._id}/unfollow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axios.put(`/users/${user._id}/follow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "FOLLOW", payload: user._id });
            }
            setFollowed(!followed);
        } catch (err) {
        }
    };

    const openRightbarForm = (e) => {
        e.preventDefault();
        document.getElementById("myRightbarForm").style.display = "block";
    }

    const closeRightbarForm = (e) => {
        e.preventDefault();
        document.getElementById("myRightbarForm").style.display = "none";
    }

    const formCity = useRef();
    const formFrom = useRef();
    const formRelationship = useRef();
    const formSteam = useRef();
    const formPlaystation = useRef();
    const formXbox = useRef();
    const formDiscord = useRef();

    const submitRightbarHandler = () => {
        try {
            axios.put("/users/" + user._id,
                {
                    userId: user._id,
                    city: formCity.current.value,
                    from: formFrom.current.value,
                    relationship: formRelationship.current.value,
                    steamLink: formSteam.current.value,
                    playstationLink: formPlaystation.current.value,
                    xboxLink: formXbox.current.value,
                    discordLink: formDiscord.current.value
                });
        } catch (err) {
            console.log(err);
        }
    }

    const HomeRightbar = () => {
        return (
            <>
                <div className="Controller">
                    <img className="ControllerImage" src={`${PublicFolder}controller.jpg`} alt="" />
                    <span className="ControllerText">
                        <b>Afaq Mansour</b> and <b>3 other friends</b> are currently playing together!
                    </span>
                </div>
                <div className="Ad">
                    <img className="RightbarAd" src={`${PublicFolder}gamingAd.jpg`} alt="" />
                    <span className="AdText">
                        An endless selection of video games right at your fingertips!!
                    </span>
                    <a href="https://store.steampowered.com/" style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
                        <span className="AdBoldText">
                            <b> Click Here To Get Started!</b>
                        </span>
                    </a>
                </div>
                <h4 className="RightbarTitle">Online Friends</h4>
                <ul className="RightbarFriendList">
                    {Users.map((u) => (<Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button className="RightbarFollowButton" onClick={handleClick}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}
                    </button>
                )}
                <h4 className="RightbarTitle2"><b>User Information</b></h4>
                <div className="RightbarInformation">
                    {user.username === currentUser.username && (
                        <div className="form-popup" id="myRightbarForm">
                            <form className="form-container">
                                <label><b>City: </b>
                                    <input type="text" placeholder="Enter The City That You Live In" ref={formCity} />
                                </label>
                                <label><b>From: </b>
                                    <input type="text" placeholder="Enter Where You're From" ref={formFrom} />
                                </label>
                                <label><b>Relationship Status: </b>
                                    <input type="text" placeholder="Enter Your Relationship Status" ref={formRelationship} />
                                </label>
                                <label><b>Steam Username: </b>
                                    <input type="text" placeholder="Enter Your Steam Username" ref={formSteam} />
                                </label>
                                <label><b>Playstation Username: </b>
                                    <input type="text" placeholder="Enter Your Playstation Username" ref={formPlaystation} />
                                </label>
                                <label><b>Xbox Username: </b>
                                    <input type="text" placeholder="Enter Your Xbox Username" ref={formXbox} />
                                </label>
                                <label><b>Discord Username: </b>
                                    <input type="text" placeholder="Enter Your Discord Username" ref={formDiscord} />
                                </label>
                                <button type="submit" className="button" onClick={submitRightbarHandler}>Submit</button>
                                <button type="button" className="button cancel" onClick={closeRightbarForm}>Close</button>
                            </form>
                        </div>
                    )}
                    <button className="RightbarButton" onClick={openRightbarForm}>
                        <div className="RightbarInformationItem">
                            <span className="RightbarInformationKey">City:</span>
                            <span className="RightbarInformationValue">{user.city === "" ? "-" : user.city}</span>
                        </div>
                    </button>
                    <button className="RightbarButton" onClick={openRightbarForm}>
                        <div className="RightbarInformationItem">
                            <span className="RightbarInformationKey">From:</span>
                            <span className="RightbarInformationValue">{user.from === "" ? "-" : user.from}</span>
                        </div>
                    </button>
                    <button className="RightbarButton" onClick={openRightbarForm}>
                        <div className="RightbarInformationItem">
                            <span className="RightbarInformationKey">Relationship Status:</span>
                            <span className="RightbarInformationValue">{user.relationship === "" ? "-" : user.relationship}</span>
                        </div>
                    </button>
                    <button className="RightbarButton" onClick={openRightbarForm}>
                        <div className="RightbarInformationItem">
                            <img className="RightbarGamingImage" src={`${PublicFolder}Steam.png`} alt="" />
                            <span className="RightbarInformationGamingValue"> {user.steamLink === "" ? "-" : user.steamLink}</span>
                        </div>
                    </button>
                    <button className="RightbarButton" onClick={openRightbarForm}>
                        <div className="RightbarInformationItem">
                            <img className="RightbarGamingImage" src={`${PublicFolder}Playstation.png`} alt="" />
                            <span className="RightbarInformationGamingValue"> {user.playstationLink === "" ? "-" : user.playstationLink}</span>
                        </div>
                    </button>
                    <button className="RightbarButton" onClick={openRightbarForm}>
                        <div className="RightbarInformationItem">
                            <img className="RightbarGamingImage" src={`${PublicFolder}Xbox.png`} alt="" />
                            <span className="RightbarInformationGamingValue"> {user.xboxLink === "" ? "-" : user.xboxLink}</span>
                        </div>
                    </button>
                    <button className="RightbarButton" onClick={openRightbarForm}>
                        <div className="RightbarInformationItem">
                            <img className="RightbarGamingImage" src={`${PublicFolder}Discord.png`} alt="" />
                            <span className="RightbarInformationGamingValue"> {user.discordLink === "" ? "-" : user.discordLink}</span>
                        </div>
                    </button>
                </div>
                <h4 className="RightbarTittle">User Friends</h4>
                <div className="RightbarFollowingList">
                    {friends.map((friend) => (
                        <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                            <div className="RightbarFollowing">
                                <img src={friend.profilePicture ? PublicFolder + friend.profilePicture : PublicFolder + "person/noAvatar.png"} alt="" className="RightbarFollowingImage" />
                                <span className="RightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        )
    }

    return (
        <div className="Rightbar">
            <div className="RightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}