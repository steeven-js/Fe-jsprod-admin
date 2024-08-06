// Page.js
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { CONFIG } from 'src/config-global';
import { fetchMarketingsPosts } from 'src/store/slices/postMarketingsSlice';

import { PostListView } from 'src/sections/marketings/view';

const metadata = { title: `Marketings Posts | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchMarketingsPosts());
    }, [dispatch]);

  const { marketingsPosts, isLoading, error } = useSelector((state) => state.marketingsPost);

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
        <title>{metadata.title}</title>
      </Helmet>

      <PostListView posts={marketingsPosts} isLoading={isLoading} />
    </>
  );
}
