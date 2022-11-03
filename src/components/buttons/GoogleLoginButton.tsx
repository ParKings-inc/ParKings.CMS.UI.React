import { Component, ReactNode } from "react";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import AccountService from "../../services/AccountService";

interface Props {
    onUserLogin(user: any): void;
}

export default class GoogleLoginButton extends Component<Props> {
    private readonly accountService: AccountService = new AccountService();

    public render(): ReactNode {
        return (
            <GoogleOAuthProvider clientId="470134517886-f5sgc46163gim5b4dtba1j3egd06hmoa.apps.googleusercontent.com">
                <GoogleLogin
                    text="signin_with"
                    onSuccess={(response) => this.success(response)}
                    onError={() => this.fail()}
                />
            </GoogleOAuthProvider>
        );
    }

    private success(response: CredentialResponse): void {
        this.accountService.saveCredential(response.credential);
        let user: any = this.accountService.parseJwt(response.credential);
        this.props.onUserLogin(user);
    }

    private fail(): void {
        console.log("Unable to log in using Google");
    }
}
