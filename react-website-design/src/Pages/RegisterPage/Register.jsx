import "./Register.css"
import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router"
import { Link } from "react-router-dom"

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();

        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            };
            try {
                await axios.post("/auth/register", user);
                history.push("/login");
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className="Login">
            <div className="LoginWrapper">
                <div className="LoginLeft">
                    <h3 className="LoginLogo">GameHub</h3>
                    <span className="LoginDescription">
                        Connect with friends and like-minded gamers from all around the world on GameHub!
                    </span>
                </div>
                <div className="LoginRight">
                    <form className="LoginBox" onSubmit={handleClick}>
                        <input placeholder="Username" required ref={username} className="LoginInput" />
                        <input placeholder="Email" required ref={email} type="email" className="LoginInput" />
                        <input placeholder="Password" required ref={password} minLength="6" type="password" className="LoginInput" />
                        <input placeholder="Password Again" required ref={passwordAgain} type="password" className="LoginInput" />
                        <button className="LoginButton" type="submit">Sign Up</button>
                        <button className="LoginRegisterButton">
                            <Link to="/login" style={{ textDecoration: "none" }} className="LoginRegisterLink">
                                Log Into Your Account
                            </Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
