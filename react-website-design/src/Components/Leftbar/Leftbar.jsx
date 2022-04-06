import "./Leftbar.css"
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  Event,
  School,
  VideogameAsset
} from "@material-ui/icons"
import { Users } from "../../DummyData"
import CloseFriend from "../CloseFriend/CloseFriend"
import { Link } from "react-router-dom"

export default function Leftbar() {
  return (
    <div className="Leftbar">
      <div className="LeftbarWrapper">
        <ul className="LeftbarList">
          <li className="LeftbarListItem">
            <RssFeed className="LeftbarIcon" />
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="LeftbarListItemText">Feed</span>
            </Link>
          </li>
          <li className="LeftbarListItem">
            <Chat className="LeftbarIcon" />
            <Link to="/messenger" style={{ textDecoration: "none" }}>
              <span className="LeftbarListItemText">Chats</span>
            </Link>
          </li>
          <li className="LeftbarListItem">
            <PlayCircleFilledOutlined className="LeftbarIcon" />
            <a href="https://www.youtube.com/" style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
              <span className="LeftbarListItemText">Videos</span>
            </a>
          </li>
          <li className="LeftbarListItem">
            <Group className="LeftbarIcon" />
            <a href="https://reddit.com/" style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
              <span className="LeftbarListItemText">Groups</span>
            </a>
          </li>
          <li className="LeftbarListItem">
            <Bookmark className="LeftbarIcon" />
            <a href="https://z-lib.org/" style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
              <span className="LeftbarListItemText">Bookmarks</span>
            </a>
          </li>
          <li className="LeftbarListItem">
            <HelpOutline className="LeftbarIcon" />
            <a href="https://quora.com/" style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
              <span className="LeftbarListItemText">Questions</span>
            </a>
          </li>
          <li className="LeftbarListItem">
            <VideogameAsset className="LeftbarIcon" />
            <a href="https://store.steampowered.com/" style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
              <span className="LeftbarListItemText">Video Games</span>
            </a>
          </li>
          <li className="LeftbarListItem">
            <Event className="LeftbarIcon" />
            <a href="https://www.eventsforgamers.com/" style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
              <span className="LeftbarListItemText">Events</span>
            </a>
          </li>
          <li className="LeftbarListItem">
            <School className="LeftbarIcon" />
            <a href="https://www.gamersensei.com/" style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
              <span className="LeftbarListItemText">Coaching</span>
            </a>
          </li>
        </ul>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" style={{ textDecoration: "none" }} target="_blank" rel="noreferrer">
          <button className="LeftbarButton">Show More</button>
        </a>
        <hr className="LeftbarHr" />
        <ul className="LeftbarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div >
  )
}