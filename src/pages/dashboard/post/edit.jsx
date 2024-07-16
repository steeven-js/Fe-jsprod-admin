import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { query, where, getDocs, collection } from 'firebase/firestore';

import { useParams } from 'src/routes/hooks';

import { db } from 'src/utils/firebase';

import { CONFIG } from 'src/config-global';

import { PostEditView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

const metadata = { title: `Post edit | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { title = '' } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ==========================================================
  // Firebase: Fetch and Log Post by Title
  // ==========================================================
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, where('title', '==', title));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const postDoc = querySnapshot.docs[0];
          setPost({ id: postDoc.id, ...postDoc.data() });
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('An error occurred while fetching the post');
      } finally {
        setLoading(false);
      }
    };

    if (title) {
      fetchPost();
    }

    return () => {
      // Cleanup if needed
    };
  }, [title]);
  // ==========================================================

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostEditView post={post} />
    </>
  );
}
