import { auth, User } from "firebase/app";
import { useEffect, useState } from "react";

export function useUser(): User | null | undefined {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      console.info("onAuthStateChanged", user);
      setUser(user);
    });
    return unsubscribe;
  }, []);
  return user;
}
