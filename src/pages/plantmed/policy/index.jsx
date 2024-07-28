import { Helmet } from 'react-helmet-async';

import { PolicyView } from 'src/sections/plantmed/policy';

// ----------------------------------------------------------------------

const metadata = {
  title: 'Jacques Steeven',
  description: "Policy de l'application PlantMed",
};

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Helmet>

      <PolicyView />
    </>
  );
}
