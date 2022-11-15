import { Component, ReactNode } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ReservationsPage from "../pages/ReservationsPage";
import "../styles/NavBar.css";

export default class NavBar extends Component {
    public render(): ReactNode {
        return (
            <BrowserRouter>
                <div>
                    <nav>
                        <ul className="router">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li className="">
                                <Link to="/reservations">Reservations</Link>
                            </li>
                            <li className="router-space">
                                <Link to="/login">Log In</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage onUserLogin={(user) => this.loggedIn(user)} />} />
                    <Route path="/reservations" element={<ReservationsPage />} />
                </Routes>
            </BrowserRouter>
        );
    }

    private loggedIn(user: any): void {
        console.log("user logged in");
        console.log(user);
    }
}
