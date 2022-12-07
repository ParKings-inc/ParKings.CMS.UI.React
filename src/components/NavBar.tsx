import axios from "axios";
import { Component, ReactNode } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ReservationsPage from "../pages/ReservationsPage";
import TariffCreate from "../pages/Tariff/create/TariffCreate";
import AccountService from "../services/AccountService";
import "../styles/NavBar.css";


interface Props {}

interface State {
    loggedIn: boolean;
}

export default class NavBar extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            loggedIn: false
        };
        this.initialise(new AccountService());
    }

    public render(): ReactNode {
        return (
            <BrowserRouter>
                <div>
                    <nav>
                        <ul className="router">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            {this.state.loggedIn ? this.getLoggedInLinks() : this.getLoggedOutLinks()}
                        </ul>
                    </nav>
                </div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage onUserLogin={(user, accountService) => this.loggedIn(user, accountService)} />} />
                    <Route path="/reservations" element={<ReservationsPage />} />
                   <Route path="/tariff" element={<TariffCreate />} />
                </Routes>
            </BrowserRouter>
        );
    }

    private getLoggedInLinks(): ReactNode {
        return (
            <>
                <li className="">
                    <Link to="/reservations">Reservations</Link>
                </li>
                <li className="router-space">
                    <Link to="/login">Log out</Link>
                </li>
            </>
        )
    }

    private getLoggedOutLinks(): ReactNode {
        return (
            <>
                <li className="router-space">
                    <Link to="/login">Log in</Link>
                </li>
            </>
        )
    }

    private initialise(accountService: AccountService): void {
        if (accountService.getCredential() == null) {
            return;
        }
        this.setDefaults(accountService);
        this.state = {
            loggedIn: true
        };
    }

    private loggedIn(user: any, accountService: AccountService): void {
        this.setDefaults(accountService);
        this.setState({
            loggedIn: true
        });
    }

    private setDefaults(accountService: AccountService): void {
        axios.defaults.params = {
            token: accountService.getCredential()
        };
    }

}
