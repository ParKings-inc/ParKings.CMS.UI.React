export default class AccountService {
    public saveCredential(credential?: string): void {
        if (credential == null) {
            return;
        }
        sessionStorage.setItem("userCredential", credential);
    }

    public getCredential(): string | null {
        return sessionStorage.getItem("userCredential");
    }

    public parseJwt(credential?: string): any {
        if (credential == null) {
            return null;
        }

        var base64Url = credential.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );

        return JSON.parse(jsonPayload);
    }
}
