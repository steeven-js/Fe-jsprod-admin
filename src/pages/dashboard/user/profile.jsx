import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { useAuth } from 'src/hooks/use-auth';

import { CONFIG } from 'src/config-global';

import { UserProfileView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

const metadata = { title: `User profile | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { userId, userProfile, loading } = useAuth();


  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <UserProfileView userId={userId} userProfile={userProfile} />
      )}

    </>
  );
}
