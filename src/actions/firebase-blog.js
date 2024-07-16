import { query, where, limit, getDocs, orderBy, collection } from 'firebase/firestore';

import { db } from 'src/utils/firebase';

export const fetchPostBySlug = async (slug) => {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('Post not found');
    }

    const postDoc = querySnapshot.docs[0];
    return { id: postDoc.id, ...postDoc.data() };
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const fetchAllPosts = async () => {
  try {
    const postsRef = collection(db, 'posts');
    const querySnapshot = await getDocs(postsRef);

    return querySnapshot.docs.map((_doc) => ({
      id: _doc.id,
      ..._doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchLatestPosts = async (count = 4) => {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'), limit(count));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((_doc) => ({
      id: _doc.id,
      ..._doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    throw error;
  }
};
