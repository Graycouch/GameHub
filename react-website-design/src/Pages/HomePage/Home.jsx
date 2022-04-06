import Topbar from "../../Components/Topbar/Topbar";
import Leftbar from "../../Components/Leftbar/Leftbar";
import Feed from "../../Components/Feed/Feed";
import Rightbar from "../../Components/Rightbar/Rightbar";
import "./Home.css";

export default function Home() {
  return (
    <> 
      <Topbar />
      <div className="HomeContainer">
        <Leftbar />
        <Feed />
        <Rightbar />
      </div>
    </>
  )
}
