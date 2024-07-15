import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';

import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { db } from 'src/utils/firebase';

import { _userCards } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { UserCardList } from '../user-card-list';

// ----------------------------------------------------------------------

export function UserCardsView() {
  // Etat pour stocker les données des utilisateurs
  const [tableData, setTableData] = useState([]);

  // ==========================================================
  // Firebase: Fetch and Log Users
  // ==========================================================
  useEffect(() => {
    const fetchAndLogUsers = async () => {
      try {
        // Référence à la collection 'users'
        const usersRef = collection(db, 'users');

        // Récupère tous les documents de la collection 'users'
        const querySnapshot = await getDocs(usersRef);

        // Crée un tableau pour stocker les données des utilisateurs
        const users = [];

        // Itère à travers chaque document et log les données
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // console.log(doc.id, '=>', data);
          users.push({ id: doc.id, ...data });
        });

        // Met à jour l'état avec les données des utilisateurs récupérées
        setTableData(users);
      } catch (error) {
        // Log une erreur si la récupération des utilisateurs échoue
        console.error('Error fetching users:', error);
      }
    };

    // Appelle la fonction pour récupérer et log les utilisateurs
    fetchAndLogUsers();
  }, []); // Le tableau vide [] garantit que cet effet se déclenche uniquement une fois après le montage du composant
  // ==========================================================

  // console.log('tableData:', tableData);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="User cards"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Cards' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.user.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New user
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserCardList users={tableData} />
    </DashboardContent>
  );
}
