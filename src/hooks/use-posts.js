import { useState, useEffect } from 'react';
import {
  where,
  endAt,
  query,
  limit,
  orderBy,
  startAt,
  collection,
  onSnapshot,
} from 'firebase/firestore';

import { db } from 'src/utils/firebase';

export function usePosts(sortBy = 'latest', searchQuery = '', publish = 'all') {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    const q = searchQuery
      ? query(
          collection(db, 'posts'),
          orderBy('title'),
          startAt(searchQuery),
          endAt(`${searchQuery}\uf8ff`),
          limit(10)
        )
      : query(
          collection(db, 'posts'),
          ...[
            orderBy(sortBy === 'popular' ? 'totalViews' : 'createdAt', sortBy === 'oldest' ? 'asc' : 'desc'),
            limit(20),
            ...(publish !== 'all' ? [where('publish', '==', publish)] : []),
          ]
        );

    unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [sortBy, searchQuery, publish]);

  return { posts, loading };
}

export function useLatestPosts(count = 4) {
  const [latestPosts, setLatestPosts] = useState([]);
  const [latestPostsLoading, setLatestPostsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(count));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLatestPosts(fetchedPosts);
        setLatestPostsLoading(false);
      },
      (error) => {
        console.error('Error fetching latest posts:', error);
        setLatestPostsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [count]);

  return { latestPosts, latestPostsLoading };
}

export function useFetchPostBySlug(slug) {
  const [postBySlug, setPostBySlug] = useState(null);
  const [postBySlugLoading, setPostBySlugLoading] = useState(true);
  const [postError, setPostError] = useState(null);

  useEffect(() => {
    let unsubscribe = () => {};

    if (slug) {
      const q = query(collection(db, 'posts'), where('slug', '==', slug));

      unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          if (querySnapshot.empty) {
            setPostError('Post not found');
            setPostBySlug(null);
          } else {
            const postDoc = querySnapshot.docs[0];
            setPostBySlug({ id: postDoc.id, ...postDoc.data() });
            setPostError(null);
          }
          setPostBySlugLoading(false);
        },
        (error) => {
          console.error('Error fetching post:', error);
          setPostError(error.message);
          setPostBySlugLoading(false);
        }
      );
    } else {
      setPostBySlugLoading(false);
    }

    return () => unsubscribe();
  }, [slug]);

  return { postBySlug, postBySlugLoading, postError };
}

export function useSearchPosts(searchQuery) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    if (searchQuery) {
      const q = query(
        collection(db, 'posts'),
        orderBy('title'),
        startAt(searchQuery),
        endAt(`${searchQuery}\uf8ff`),
        limit(10)
      );

      unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const fetchedPosts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSearchResults(fetchedPosts);
          setSearchLoading(false);
        },
        (error) => {
          console.error('Error fetching posts:', error);
          setSearchLoading(false);
        }
      );
    } else {
      setSearchResults([]);
      setSearchLoading(false);
    }

    return () => unsubscribe();
  }, [searchQuery]);

  return { searchResults, searchLoading };
}
