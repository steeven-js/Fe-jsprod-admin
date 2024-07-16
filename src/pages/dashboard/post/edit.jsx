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
  const { slug = '' } = useParams();
  const [post, setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState(null);

  // console.log('Slug:', slug);

  // ==========================================================
  // Firebase: Fetch and Log Post by Slug
  // ==========================================================
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setPostLoading(true);
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, where('slug', '==', slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const postDoc = querySnapshot.docs[0];
          const postData = { id: postDoc.id, ...postDoc.data() };
          setPost(postData);
        } else {
          console.log('Post not found');
          setPostError('Post not found');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setPostError('An error occurred while fetching the post');
      } finally {
        setPostLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }

    return () => {
      // Cleanup if needed
    };
  }, [slug]);

  // Log post when it changes
  useEffect(() => {
    if (post) {
      console.log('Updated Post:', post);
    }
  }, [post]);
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
