import { Helmet } from 'react-helmet-async';

import { useAuth } from 'src/hooks/use-auth';

import { CONFIG } from 'src/config-global';

import { UserProfileView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

const metadata = { title: `User profile | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { userId, userProfile } = useAuth();

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UserProfileView userId={userId} userProfile={userProfile} />
    </>
  );
}
