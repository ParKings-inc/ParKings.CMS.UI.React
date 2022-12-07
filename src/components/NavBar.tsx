import axios from "axios";
import { Component, ReactNode } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ReservationsPage from "../pages/ReservationsPage";
import TariffCreate from "../pages/Tariff/create/TariffCreate";
import AccountService from "../services/AccountService";
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
              <li>
                <Link to="/tariff">Tariff</Link>
              </li>
              <li className="router-space">
                <Link to="/login">Log In</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <LoginPage
                onUserLogin={(user, accountService) =>
                  this.loggedIn(user, accountService)
                }
              />
            }
          />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/tariff" element={<TariffCreate />} />
        </Routes>
      </BrowserRouter>
    );
  }

  private loggedIn(user: any, accountService: AccountService): void {
    axios.defaults.params = {
      token: accountService.getCredential(),
    };
  }
}
