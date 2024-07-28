import { Helmet } from 'react-helmet-async';

import { CguView } from 'src/sections/plantmed/cgu';

// ----------------------------------------------------------------------

const metadata = {
  title: 'Jacques Steeven',
  description: "Cgu de l'application PlantMed",
};

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Helmet>

      <CguView />
    </>
  );
}
