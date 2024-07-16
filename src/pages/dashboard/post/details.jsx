import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetPost } from 'src/actions/blog';

import { PostDetailsView } from 'src/sections/blog/view';
import { db } from 'src/utils/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const metadata = { title: `Post details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { slug = '' } = useParams();
  const [post, setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState(null);

  console.log('Title:', slug);

  // ==========================================================
  // Firebase: Fetch and Log Post by Title
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

      <PostDetailsView post={post} loading={postLoading} error={postError} />
    </>
  );
}
