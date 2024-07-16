// src/hooks/use-posts.js
import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, startAt, endAt, getDocs } from 'firebase/firestore';
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
            endAt(searchQuery + '\uf8ff'),
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
          endAt(searchQuery + '\uf8ff'),
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
  }, []);

  return { searchResults, searchLoading };
}
