import firebase from "firebase/app";
import { useEffect, useState } from "react";

export function useUser(): firebase.User | null | undefined {
  const [user, setUser] = useState<firebase.User | null | undefined>(undefined);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      console.info("onAuthStateChanged", user);
      setUser(user);
    });
    return unsubscribe;
  }, []);
  return user;
}
