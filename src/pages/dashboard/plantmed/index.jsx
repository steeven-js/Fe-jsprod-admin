import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OverviewPlantmedView } from 'src/sections/overview/plantmed/view';

// ----------------------------------------------------------------------

const metadata = { title: `Analytics | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OverviewPlantmedView />
    </>
  );
}
