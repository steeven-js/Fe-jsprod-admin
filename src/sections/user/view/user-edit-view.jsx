import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';

import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hooks';

import { db } from 'src/utils/firebase';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { UserNewEditForm } from '../user-new-edit-form';

// ----------------------------------------------------------------------

export function UserEditView() {
  const { id } = useParams(); // Récupère l'ID de l'utilisateur à partir des paramètres de l'URL
  const [userData, setUserData] = useState(null);

  // ==========================================================
  // Firebase: Fetch and Log User by ID
  // ==========================================================
  useEffect(() => {
    const fetchUserById = async (userId) => {
      try {
        // Référence au document de l'utilisateur spécifique
        const userDocRef = doc(db, 'users', userId);

        // Récupère le document de l'utilisateur
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // Met à jour l'état avec les données de l'utilisateur
          setUserData({ id: userDoc.id, ...userDoc.data() });
          // console.log(userDoc.id, '=>', userDoc.data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        // Affiche une erreur dans la console en cas de problème
        console.error('Error fetching user:', error);
      }
    };

    // Appelle la fonction pour récupérer l'utilisateur par ID
    if (id) {
      fetchUserById(id);
    }
  }, [id]); // Dépendance à l'ID pour recharger les données lorsque l'ID change
  // ==========================================================

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Card', href: paths.dashboard.user.cards },
          { name: userData?.name || 'Loading...' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserNewEditForm currentUser={userData} />
    </DashboardContent>
  );
}
