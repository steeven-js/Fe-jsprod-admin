import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { useAuth } from 'src/hooks/use-auth';

import { CONFIG } from 'src/config-global';

import { PostListView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `Post list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { user, loading } = useAuth();

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
        <PostListView currentUser={user} />
      )}
    </>
  );
}
