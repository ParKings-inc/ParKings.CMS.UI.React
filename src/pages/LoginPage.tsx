import { Component, ReactNode } from "react";
import GoogleLoginButton from "../components/buttons/GoogleLoginButton";
import AccountService from "../services/AccountService";
import "../styles/LoginPage.css";

interface Props {
    onUserLogin(user: any, accountService: AccountService): void;
}

export default class LoginPage extends Component<Props> {
    public render(): ReactNode {
        return (
            <div className="centre">
                <div className="login-title">Log In</div>
                <div className="login-container">
                    <GoogleLoginButton onUserLogin={this.props.onUserLogin} />
                </div>
            </div>
        );
    }
}
