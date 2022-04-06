import "./Online.css"

export default function Online({user}) {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="RightbarFriend">
            <div className="RightbarProfileImageContainer">
                <img className="RightbarProfilePicture" src={PublicFolder+user.profilePicture} alt="" />
                <span className="RightbarOnline"></span>
            </div>
            <span className="RightbarUsername">{user.username}</span>
        </li>
    )
}
