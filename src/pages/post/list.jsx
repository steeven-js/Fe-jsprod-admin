import { Helmet } from 'react-helmet-async';

import { usePosts } from 'src/hooks/use-posts';

import { CONFIG } from 'src/config-global';

import { PostListHomeView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `Post list - ${CONFIG.site.name}` };

export default function Page() {
  const { posts, loading } = usePosts();

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostListHomeView posts={posts} loading={loading} />
    </>
  );
}
