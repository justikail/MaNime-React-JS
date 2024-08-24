import { db } from "../libs/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

async function saveToDatabase(userAuth) {
  if (!userAuth) return;

  const userRef = doc(db, "users", userAuth.uid);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email, uid } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        uid,
        name: displayName ? displayName : "Gaijin",
        email,
        avatar: `https://anime.kirwako.com/api/avatar?name=${displayName ? displayName : "Gaijin"}`,
        createdAt,
        shared: false,
        themes: "default",
        animeList: [],
      });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  }

  return userRef;
}

export { saveToDatabase };
