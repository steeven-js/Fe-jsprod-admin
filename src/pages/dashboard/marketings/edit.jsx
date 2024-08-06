import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import { PostEditView } from 'src/sections/marketings/view';

// ----------------------------------------------------------------------

const metadata = { title: `Post edit | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { slug = '' } = useParams();

  const { marketingsPosts} = useSelector((state) => state.marketingsPost);

  // filtrer marketingsPosts pour trouver le post avec le slug correspondant
  const postBySlug = marketingsPosts.find((post) => post.slug === slug);
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostEditView post={postBySlug} />
    </>
  );
}
