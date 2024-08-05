import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { CONFIG } from 'src/config-global';
import { fetchUserData } from 'src/store/slices/userSlice';

import { BlankView } from 'src/sections/marketings/view';

// ----------------------------------------------------------------------

const metadata = { title: `Marketings Posts | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const dispatch = useDispatch();
  const { data: userData, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserData('3GnwlLwTtFaTuZJfojJqkUMQRDi1')); // Remplacez par l'ID réel de l'utilisateur
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Chargement...</div>;
  }

  if (status === 'failed') {
    return <div>Erreur : {error}</div>;
  }

  if (!userData) {
    return <div>Aucune donnée utilisateur disponible.</div>;
  }

  console.log('userData', userData);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <BlankView />
    </>
  );
}
