import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { useFetchPostBySlug } from 'src/hooks/use-posts';

import { CONFIG } from 'src/config-global';

import { PostEditView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `Post edit | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { slug = '' } = useParams();

  const { postBySlug } = useFetchPostBySlug(slug);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostEditView post={postBySlug} />
    </>
  );
}
