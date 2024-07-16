import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { fetchPostBySlug } from 'src/actions/firebase-blog';

import { PostDetailsView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `Post details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { slug = '' } = useParams();
  const [post, setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      if (!slug) return;

      setPostLoading(true);
      try {
        const postData = await fetchPostBySlug(slug);
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post:', error);
        setPostError(error.message || 'An error occurred while fetching the post');
      } finally {
        setPostLoading(false);
      }
    };

    getPost();
  }, [slug]);

  useEffect(() => {
    if (post) {
      console.log('Updated Post:', post);
    }
  }, [post]);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostDetailsView post={post} loading={postLoading} error={postError} />
    </>
  );
}
