import "./CloseFriend.css"

export default function CloseFriend({user}) {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="LeftbarFriend">
            <img className="LeftbarFriendImage" src={PublicFolder+user.profilePicture} alt="" />
            <span className="LeftbarFriendName">{user.username}</span>
        </li>
    )
}
