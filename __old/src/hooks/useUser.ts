import * as Sentry from "@sentry/react";
import firebase from "firebase/app";
import { useEffect, useState } from "react";

export function useUser(): firebase.User | null | undefined {
  const [user, setUser] = useState<firebase.User | null | undefined>(undefined);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        Sentry.setUser({
          email: user.email ?? undefined,
          id: user.uid,
        });
      } else {
        Sentry.setUser(null);
      }
      setUser(user);
    });
    return unsubscribe;
  }, []);
  return user;
}
