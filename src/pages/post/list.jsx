import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { fetchAllPosts } from 'src/actions/firebase-blog';

import { PostListHomeView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `Post list - ${CONFIG.site.name}` };

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  // ==========================================================
  // Firebase: Fetch and Log Posts
  // ==========================================================
  const fetchPosts = async () => {
    try {
      setPostsLoading(true);
      const fetchedPosts = await fetchAllPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  // ==========================================================

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostListHomeView posts={posts} loading={postsLoading} />
    </>
  );
}
