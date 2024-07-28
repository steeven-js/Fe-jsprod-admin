import { Helmet } from 'react-helmet-async';

import { HomeView } from 'src/sections/plantmed/home';

// ----------------------------------------------------------------------

const metadata = {
  title: 'Plantmed',
  description: 'Application sur les plantes médicinales',
};

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Helmet>

      <HomeView />
    </>
  );
}
