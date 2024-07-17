import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateProfile, onAuthStateChanged } from 'firebase/auth';

import { db, auth } from 'src/utils/firebase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (_user) => {
      if (_user) {
        setUser(_user);
        // Récupérer le profil utilisateur depuis Firestore
        try {
          const userProfileDoc = doc(db, 'users', _user.uid);
          const userProfileSnapshot = await getDoc(userProfileDoc);
          if (userProfileSnapshot.exists()) {
            setUserProfile(userProfileSnapshot.data());
          } else {
            console.log("Le profil utilisateur n'existe pas");
          }
        } catch (error) {
          console.error('Erreur lors de la récupération du profil utilisateur:', error);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    // Nettoyer l'abonnement lors du démontage du composant
    return () => unsubscribe();
  }, []);

  return { user, userProfile, loading };
}

export function useUpdateUserProfile() {
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const updateUserProfile = async (newData) => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    setIsUpdating(true);
    setError(null);

    try {
      // Update Firebase Auth user profile
      const authUpdateData = {};
      if (newData.displayName) authUpdateData.displayName = newData.displayName;
      if (newData.photoURL) authUpdateData.photoURL = newData.photoURL;

      if (Object.keys(authUpdateData).length > 0) {
        await updateProfile(auth.currentUser, authUpdateData);
      }

      // Update Firestore user profile
      const userProfileRef = doc(db, 'users', user.uid);
      await updateDoc(userProfileRef, newData);

      // You might want to refresh the userProfile state here
      // This depends on how you've set up your useAuth hook
      // For example, you could add a refreshUserProfile function to useAuth
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateUserProfile, isUpdating, error };
}
