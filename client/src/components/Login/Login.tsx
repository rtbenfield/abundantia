import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useTheme } from "@material-ui/core";
import * as React from "react";
import GoogleLogin from "react-google-login";
import { useUserContext } from "../../contexts/userContext";

const Login: React.FunctionComponent = () => {
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
          }}
          theme={theme.palette.type}
        />
      </DialogActions>
    </Dialog>
  );
};

export default Login;
