import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "./index";
import {
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = {
      displayName: res.user.displayName,
      email: res.user.email,
      photoURL: res.user.photoURL,
      id: res.user.uid,
    };
    const doc = await addUserRecordToDb(user);
    if (doc) return doc;
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const addUserRecordToDb = async user => {
  try {
    const docRef = doc(db, "users", user.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    // doc.data() will be undefined in this case
    return await setDoc(doc(db, "users", user.id), user, { merge: true });
  } catch (error) {
    throw new Error(error);
  }
};

export const getProductById = async id => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists())
      return {
        ...docSnap.data(),
        id: docSnap.id,
      };
    else throw new Error("Document does not exist");
  } catch (error) {
    throw new Error(error);
  }
};

export const addItemToWishList = async (userId, productId) => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      wishlist: arrayUnion(productId),
    });
  } catch (error) {
    throw new Error(error);
  }
};
export const removeItemFromWishList = async (userId, productId) => {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      wishlist: arrayRemove(productId),
    });
  } catch (error) {
    throw new Error(error);
  }
};
