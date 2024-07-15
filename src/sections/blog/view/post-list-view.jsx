import { useState, useEffect, useCallback } from 'react';
import { doc, getDocs, deleteDoc, collection } from 'firebase/firestore';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useDebounce } from 'src/hooks/use-debounce';
import { useSetState } from 'src/hooks/use-set-state';

import { db } from 'src/utils/firebase';
import { orderBy } from 'src/utils/helper';

import { POST_SORT_OPTIONS } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGetPosts, useSearchPosts } from 'src/actions/blog';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PostSort } from '../post-sort';
import { PostSearch } from '../post-search';
import { PostListHorizontal } from '../post-list-horizontal';

// ----------------------------------------------------------------------

export function PostListView() {
  const [sortBy, setSortBy] = useState('latest');

  const [searchQuery, setSearchQuery] = useState('');
  // const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  const debouncedQuery = useDebounce(searchQuery);

  // const { posts, postsLoading } = useGetPosts();

  const { searchResults, searchLoading } = useSearchPosts(debouncedQuery);

  const filters = useSetState({ publish: 'all' });

  // const dataFiltered = applyFilter({ inputData: posts, filters: filters.state, sortBy });

  // ==========================================================
  // Firebase: Fetch and Log Posts
  // ==========================================================
  useEffect(() => {
    const fetchAndLogPosts = async () => {
      try {
        setPostsLoading(true);
        // Référence à la collection 'posts'
        const postsRef = collection(db, 'posts');

        // Récupère tous les documents de la collection 'posts'
        const querySnapshot = await getDocs(postsRef);

        // Crée un tableau pour stocker les données des utilisateurs
        const posts = [];

        // Itère à travers chaque document et log les données
        querySnapshot.forEach((_doc) => {
          const data = _doc.data();
          // console.log(doc.id, '=>', data);
          posts.push({ id: _doc.id, ...data });
        });

        // Met à jour l'état avec les données des utilisateurs récupérées
        setPosts(posts);
        setPostsLoading(false);
      } catch (error) {
        // Log une erreur si la récupération des utilisateurs échoue
        console.error('Error fetching posts:', error);
        setPostsLoading(false);
      }
    };

    // Appelle la fonction pour récupérer et log les utilisateurs
    fetchAndLogPosts();
  }, []); // Le tableau vide [] garantit que cet effet se déclenche uniquement une fois après le montage du composant
  // ==========================================================

  // console.log('posts:', posts);
  // console.log('posts:', posts);

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue) => {
    setSearchQuery(inputValue);
  }, []);

  const handleFilterPublish = useCallback(
    (event, newValue) => {
      filters.setState({ publish: newValue });
    },
    [filters]
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Blog', href: paths.dashboard.post.root },
          { name: 'List' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.post.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New post
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <PostSearch
          query={debouncedQuery}
          results={searchResults}
          onSearch={handleSearch}
          loading={searchLoading}
          hrefItem={(title) => paths.dashboard.post.details(title)}
        />

        <PostSort sort={sortBy} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS} />
      </Stack>

      <Tabs
        value={filters.state.publish}
        onChange={handleFilterPublish}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        {['all', 'published', 'draft'].map((tab) => (
          <Tab
            key={tab}
            iconPosition="end"
            value={tab}
            label={tab}
            icon={
              <Label
                variant={((tab === 'all' || tab === filters.state.publish) && 'filled') || 'soft'}
                color={(tab === 'published' && 'info') || 'default'}
              >
                {tab === 'all' && posts.length}

                {tab === 'published' && posts.filter((post) => post.publish === 'published').length}

                {tab === 'draft' && posts.filter((post) => post.publish === 'draft').length}
              </Label>
            }
            sx={{ textTransform: 'capitalize' }}
          />
        ))}
      </Tabs>

      <PostListHorizontal posts={posts} loading={postsLoading} />
    </DashboardContent>
  );
}

const applyFilter = ({ inputData, filters, sortBy }) => {
  const { publish } = filters;

  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }

  if (publish !== 'all') {
    inputData = inputData.filter((post) => post.publish === publish);
  }

  return inputData;
};
