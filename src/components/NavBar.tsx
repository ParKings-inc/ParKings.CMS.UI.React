import axios from "axios";
import { Component, ReactNode } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import GarageOverviewPage from "../pages/GarageOverviewPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ReservationsPage from "../pages/ReservationsPage";
import RevenuePage from "../pages/RevenuePage";
import TariffCreate from "../pages/Tariff/create/TariffCreate";
import AccountService from "../services/AccountService";
import "../styles/NavBar.css";

interface Props {}

interface State {
  loggedIn: boolean;
}

export default class NavBar extends Component<Props, State> {
  private readonly accountService: AccountService = new AccountService();

  public constructor(props: Props) {
    super(props);
    this.state = {
      loggedIn: false,
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
              {this.state.loggedIn
                ? this.getLoggedInLinks()
                : this.getLoggedOutLinks()}
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
          <Route path="/revenue" element={<RevenuePage />}></Route>
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/tariff" element={<TariffCreate />} />
          <Route path="/garageoverview" element={<GarageOverviewPage />} />
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
        <li className="">
          <Link to="/tariff">Tariff</Link>
        </li>
        <li className="">
          <Link to="/garageoverview">Garage Overview</Link>
        </li>
        <li className="">
          <Link to="/revenue">Revenue</Link>
        </li>
        <li className="router-space">
          <Link to="/" onClick={() => this.logOut()}>
            Log out
          </Link>
        </li>
      </>
    );
  }

  private getLoggedOutLinks(): ReactNode {
    return (
      <>
        <li className="router-space">
          <Link to="/login">Log in</Link>
        </li>
      </>
    );
  }

  private initialise(accountService: AccountService): void {
    if (accountService.getCredential() == null) {
      return;
    }
    this.setDefaults(accountService);
    this.state = {
      loggedIn: true,
    };
  }

  private loggedIn(user: any, accountService: AccountService): void {
    this.setDefaults(accountService);
    this.setState({
      loggedIn: true,
    });
  }

  private logOut(): void {
    this.accountService.deleteCredential();
    this.setState({
      loggedIn: false,
    });
  }

  private setDefaults(accountService: AccountService): void {}
}
