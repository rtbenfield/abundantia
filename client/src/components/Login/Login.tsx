import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useTheme } from "@material-ui/core";
import * as Sentry from "@sentry/browser";
import * as React from "react";
import ReactGA from "react-ga";
import GoogleLogin from "react-google-login";
import { useUserContext } from "../../contexts/userContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Login: React.FC = () => {
  useDocumentTitle("Login");
  const theme = useTheme();
  const userContext = useUserContext();
  return (
    <Dialog hideBackdrop open>
      <DialogTitle>Welcome to Loan Rover!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Sign in using the button below to continue. Once you sign in, you can add a new loan that you want to track
          and explore.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <GoogleLogin
          clientId={process.env.GOOGLE_CLIENT_ID || ""}
          buttonText="Login"
          cookiePolicy="single_host_origin"
          isSignedIn
          onSuccess={googleUser => {
            ReactGA.event({
              category: "login",
              action: "Login using Google Login",
            });
            if ("getBasicProfile" in googleUser) {
              const profile = googleUser.getBasicProfile();
              userContext.setUser({
                authToken: googleUser.getAuthResponse().id_token,
                email: profile.getEmail(),
                id: profile.getId(),
                imageUrl: profile.getImageUrl(),
                name: profile.getName(),
              });
            }
          }}
          onFailure={error => {
            console.error(error);
            Sentry.captureException(error);
          }}
          theme={theme.palette.type}
        />
      </DialogActions>
    </Dialog>
  );
};

export default Login;
