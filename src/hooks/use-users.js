import { useState, useEffect, useCallback } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, updateDoc, onSnapshot, collection } from 'firebase/firestore';

import { db, storage } from 'src/utils/firebase';

import { toast } from 'src/components/snackbar';

// ----------------------------------------------------------------------
// All Users

export function useUsersData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    setLoading(true);
    const usersRef = collection(db, 'users');

    unsubscribe = onSnapshot(
      usersRef,
      (snapshot) => {
        const fetchedUsers = snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }));
        setUsers(fetchedUsers);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const _updateUsers = useCallback((newUsers) => {
    setUsers(newUsers);
  }, []);

  return { users, loading, _updateUsers };
}

// ----------------------------------------------------------------------
// User by ID

export function useUserById(_userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    if (_userId) {
      setLoading(true);
      const userDocRef = doc(db, 'users', _userId);

      unsubscribe = onSnapshot(
        userDocRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            setUser({ id: docSnapshot.id, ...docSnapshot.data() });
          } else {
            console.error('No such document!');
            setUser(null);
          }
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching user:', error);
          setLoading(false);
        }
      );
    } else {
      setUser(null);
      setLoading(false);
    }

    return () => unsubscribe();
  }, [_userId]);

  return { user, loading };
}

// ----------------------------------------------------------------------
// User by Email

export async function updateUsers({ currentUser, data }) {
  // Déstructuration de l'objet data pour extraire avatarUrl et les autres données
  const { avatarUrl: initialAvatarUrl, ...otherData } = data;

  let avatarUrl = initialAvatarUrl;

  // Vérifie si un nouveau fichier avatar a été fourni
  if (data.avatarUrl && data.avatarUrl instanceof File) {
      // S'assure d'avoir un ID utilisateur
      const userId = currentUser?.id || doc(collection(db, 'users')).id;

      // Crée un nom de fichier fixe pour l'avatar
      const fileName = `avatars/${userId}/avatar.${data.avatarUrl.name.split('.').pop()}`;

      // Référence au fichier dans le stockage Firebase
      const storageRef = ref(storage, fileName);

      // Télécharge le nouveau fichier avatar dans le stockage Firebase, remplaçant l'ancien s'il existe
      await uploadBytes(storageRef, data.avatarUrl);

      // Récupère l'URL de téléchargement du nouveau fichier avatar
      avatarUrl = await getDownloadURL(storageRef);
  }

  // Crée un objet de données utilisateur avec l'URL de l'avatar mise à jour
  const userData = {
      ...otherData,
      avatarUrl,
  };

  // Référence à la collection 'users' dans Firestore
  const usersRef = collection(db, 'users');
  // Crée une référence de document pour un nouvel utilisateur ou un utilisateur existant
  const userRef = currentUser?.id ? doc(usersRef, currentUser.id) : doc(usersRef);

  // Met à jour ou crée les données utilisateur dans Firestore
  if (currentUser?.id) {
      await updateDoc(userRef, userData);
      toast.success('Mise à jour réussie !');
  } else {
      await setDoc(userRef, userData);
      toast.success('Création réussie !');
  }
}
