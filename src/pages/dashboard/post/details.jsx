import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { useFetchPostBySlug } from 'src/hooks/use-posts';

import { CONFIG } from 'src/config-global';

import { PostDetailsView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `Post details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { slug = '' } = useParams();

  const { postBySlug, postBySlugLoading, postError } = useFetchPostBySlug(slug);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostDetailsView post={postBySlug} loading={postBySlugLoading} error={postError} />
    </>
  );
}
