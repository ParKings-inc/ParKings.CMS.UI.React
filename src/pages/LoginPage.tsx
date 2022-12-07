import { Component, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import GoogleLoginButton from "../components/buttons/GoogleLoginButton";
import AccountService from "../services/AccountService";
import "../styles/LoginPage.css";

interface Props {
    onUserLogin(user: any, accountService: AccountService): void;
}

interface State {
    redirect: boolean;
}

export default class LoginPage extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    public render(): ReactNode {
        if (this.state.redirect) {
            return (<Navigate to="/" />)
        }
        return (
            <div className="centre">
                <div className="login-title">Log In</div>
                <div className="login-container">
                    <GoogleLoginButton onUserLogin={(u, s) => this.onUserLogin(u, s)} />
                </div>
            </div>
        );
    }

    private onUserLogin(user: any, accountService: AccountService): void {
        this.props.onUserLogin(user, accountService);
        this.setState({
            redirect: true
        });
    }
}
