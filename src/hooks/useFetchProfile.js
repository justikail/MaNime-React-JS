import { useEffect, useState } from "react";
import { auth, db } from "../libs/firebase";
import { doc, onSnapshot } from "firebase/firestore";

function useFetchProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    const userId = auth.currentUser.uid;
    const docRef = doc(db, "users", userId);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching user data: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { userData, loading };
}

export { useFetchProfile };
