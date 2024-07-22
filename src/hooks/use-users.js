import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, collection } from 'firebase/firestore';

import { db } from 'src/utils/firebase';

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

  const updateUsers = useCallback((newUsers) => {
    setUsers(newUsers);
  }, []);

  return { users, loading, updateUsers };
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
