import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { useAuth } from 'src/hooks/use-auth';

import { auth } from 'src/utils/firebase';

import { CONFIG } from 'src/config-global';

import { AccountView } from 'src/sections/account/view';

// ----------------------------------------------------------------------

const metadata = { title: `Account settings | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { user, userProfile, loading } = useAuth();

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <AccountView user={user} userProfile={userProfile} />
      )}
    </>
  );
}
