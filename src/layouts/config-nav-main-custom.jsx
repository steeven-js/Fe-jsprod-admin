import { paths } from 'src/routes/paths';

// import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navData = [
  { title: 'Home', path: '/', icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> },
  {
    title: 'Pages',
    path: '/pages',
    icon: <Iconify width={22} icon="solar:file-bold-duotone" />,
    children: [
      {
        subheader: 'Plantmed',
        items: [
          { title: 'Home', path: paths.plantmed.root },
          // { title: 'plants', path: paths.plantmed.plants },
          // { title: 'symptoms', path: paths.plantmed.symptoms },
          { title: 'cgu', path: paths.plantmed.cgu },
          { title: 'privacy-policy', path: paths.plantmed.privacy_policy },
        ],
      },
      { subheader: 'Dashboard', items: [{ title: 'Plantmed', path: paths.plantmed.root }] },
    ],
  },
];
