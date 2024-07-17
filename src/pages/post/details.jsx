import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { useLatestPosts, useFetchPostBySlug } from 'src/hooks/use-posts';

import { CONFIG } from 'src/config-global';

import { PostDetailsHomeView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `Post details - ${CONFIG.site.name}` };

export default function Page() {
  const { slug = '' } = useParams();

  const { postBySlug, postBySlugLoading, postError } = useFetchPostBySlug(slug);

  const { latestPosts } = useLatestPosts();

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostDetailsHomeView
        post={postBySlug}
        latestPosts={latestPosts}
        loading={postBySlugLoading}
        error={postError}
      />
    </>
  );
}
