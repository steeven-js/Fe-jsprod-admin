import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { BlankView } from 'src/sections/marketings/view';

// ----------------------------------------------------------------------

const metadata = { title: `Marketings Posts | Dashboard - ${CONFIG.site.name}` };

export default function Page() {

  const { data: userData, status, error } = useSelector((state) => state.user);

  const { posts,} = useSelector((state) => state.blog);

  console.log('posts', posts);
  console.log('userData', userData);

  if (status === 'loading') {
    return <div>Chargement...</div>;
  }

  if (status === 'failed') {
    return <div>Erreur : {error}</div>;
  }

  if (!userData) {
    return <div>Aucune donnée utilisateur disponible.</div>;
  }

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <BlankView />
    </>
  );
}
