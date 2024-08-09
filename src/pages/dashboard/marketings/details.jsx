import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import { Box, CircularProgress } from '@mui/material';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { fetchMarketingsPosts } from 'src/store/slices/postMarketingsSlice';

import { PostDetailsView } from 'src/sections/marketings/view';

// ----------------------------------------------------------------------

const metadata = { title: `Post details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { slug = '' } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMarketingsPosts());
  }, [dispatch]);

  const { marketingsPosts, isLoading, error } = useSelector((state) => state.marketingsPost);

  // filtrer marketingsPosts pour trouver le post avec le slug correspondant
  const postBySlug = marketingsPosts.find((post) => post.slug === slug);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!marketingsPosts || marketingsPosts.length === 0) {
    return <div>Aucun post marketing disponible.</div>;
  }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostDetailsView post={postBySlug} loading={isLoading} error={error} />
    </>
  );
}
