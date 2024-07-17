import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

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

// ... Le reste de votre code (signUp, etc.) reste inchangé
