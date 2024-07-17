// src/hooks/use-posts.js
import { useState, useEffect } from 'react';
import {
  where,
  endAt,
  query,
  limit,
  getDocs,
  orderBy,
  startAt,
  collection,
} from 'firebase/firestore';

import { db } from 'src/utils/firebase';

export function usePosts(sortBy = 'latest', searchQuery = '') {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        let q;
        if (searchQuery) {
          q = query(
            collection(db, 'posts'),
            orderBy('title'),
            startAt(searchQuery),
            endAt(`${searchQuery}\uf8ff`),
            limit(10)
          );
        } else {
          const orderByField = sortBy === 'popular' ? 'totalViews' : 'createdAt';
          const orderDirection = sortBy === 'oldest' ? 'asc' : 'desc';
          q = query(collection(db, 'posts'), orderBy(orderByField, orderDirection), limit(20));
        }

        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [sortBy, searchQuery]);

  return { posts, loading };
}

export function useLatestPosts(count = 4) {
  const [latestPosts, setLatestPosts] = useState([]);
  const [latestPostsLoading, setLatestPostsLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestPosts() {
      setLatestPostsLoading(true);
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(count));
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLatestPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      } finally {
        setLatestPostsLoading(false);
      }
    }

    fetchLatestPosts();
  }, [count]);

  return { latestPosts, latestPostsLoading };
}

export function useFetchPostBySlug(slug) {
  const [postBySlug, setPostBySlug] = useState(null);
  const [postBySlugLoading, setPostBySlugLoading] = useState(true);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) {
        setPostBySlugLoading(false);
        return;
      }

      setPostBySlugLoading(true);
      setPostError(null);

      try {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, where('slug', '==', slug));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          throw new Error('Post not found');
        }

        const postDoc = querySnapshot.docs[0];
        setPostBySlug({ id: postDoc.id, ...postDoc.data() });
      } catch (err) {
        console.error('Error fetching post:', err);
        setPostError(err.message);
      } finally {
        setPostBySlugLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { postBySlug, postBySlugLoading, postError };
}

export function useSearchPosts(searchQuery) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setSearchLoading(true);
      try {
        const q = query(
          collection(db, 'posts'),
          orderBy('title'),
          startAt(searchQuery),
          endAt(`${searchQuery}\uf8ff`),
          limit(10)
        );

        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSearchResults(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setSearchLoading(false);
      }
    }

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { searchResults, searchLoading };
}
