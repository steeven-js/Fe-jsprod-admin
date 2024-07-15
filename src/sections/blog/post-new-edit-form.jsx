import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { _tags } from 'src/_mock';
import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { PostDetailsPreview } from './post-details-preview';

import { db, doc, storage } from 'src/utils/firebase';

// Schema de validation
const NewPostSchema = zod.object({
  title: zod.string().min(1, { message: 'Title is required!' }),
  description: zod.string().min(1, { message: 'Description is required!' }),
  content: schemaHelper.editor().min(100, { message: 'Content must be at least 100 characters' }),
  coverUrl: schemaHelper.file({ message: { required_error: 'Cover is required!' } }),
  images: zod.array(schemaHelper.file()),
  tags: zod.string().array().min(2, { message: 'Must have at least 2 items!' }),
  metaKeywords: zod.string().array().nonempty({ message: 'Meta keywords is required!' }),
  metaTitle: zod.string(),
  metaDescription: zod.string(),
});

export function PostNewEditForm({ currentPostId }) {
  const router = useRouter();
  const preview = useBoolean();
  const [posts, setPosts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = useMemo(
    () => ({
      title: '',
      description: '',
      content: '',
      coverUrl: null,
      images: [],
      tags: [],
      metaKeywords: [],
      metaTitle: '',
      metaDescription: '',
    }),
    []
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewPostSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const values = watch();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(updatedPosts);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentPostId) {
      const currentPost = posts.find((post) => post.id === currentPostId);
      if (currentPost) {
        reset({
          ...currentPost,
          coverUrl: null, // We don't want to display the old file object
          images: [], // We don't want to display the old file objects
        });
      }
    }
  }, [currentPostId, posts, reset]);

  const uploadImage = async (file, path) => {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return {
      url: downloadURL,
      name: file.name,
      type: file.type,
      size: file.size,
    };
  };

  const deleteImage = async (imagePath) => {
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      let postData = { ...data };

      // Handle cover image
      if (data.coverUrl instanceof File) {
        const coverData = await uploadImage(data.coverUrl, `covers/${data.coverUrl.name}`);
        postData.coverUrl = coverData.url;
      }

      // Handle post images
      const imageUploadPromises = data.images.map((image) =>
        uploadImage(image, `posts/${currentPostId || 'new'}/${image.name}`)
      );
      const uploadedImages = await Promise.all(imageUploadPromises);
      postData.images = uploadedImages;

      if (currentPostId) {
        await updateDoc(doc(db, 'posts', currentPostId), postData);
      } else {
        const docRef = await addDoc(collection(db, 'posts'), postData);
        currentPostId = docRef.id;
      }

      reset();
      preview.onFalse();
      toast.success(currentPostId ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.post.root);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  });

  const handleRemoveFile = useCallback(
    (fieldName, fileToRemove) => {
      setValue(
        fieldName,
        values[fieldName].filter((file) => file !== fileToRemove)
      );
    },
    [setValue, values]
  );

  const deletePost = async (postId) => {
    try {
      const postToDelete = posts.find((post) => post.id === postId);
      if (postToDelete.coverUrl) {
        await deleteImage(postToDelete.coverUrl);
      }
      if (postToDelete.images) {
        await Promise.all(postToDelete.images.map((image) => deleteImage(image.url)));
      }
      await deleteDoc(doc(db, 'posts', postId));
      toast.success('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Error deleting post');
    }
  };

  const renderDetails = (
    <Card>
      <CardHeader title="Details" subheader="Title, short description, image..." sx={{ mb: 3 }} />
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="title" label="Post title" />
        <Field.Text name="description" label="Description" multiline rows={3} />
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Content</Typography>
          <Field.Editor name="content" sx={{ maxHeight: 480 }} />
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Cover</Typography>
          <Field.Upload
            name="coverUrl"
            maxSize={3145728}
            onDelete={() => setValue('coverUrl', null)}
          />
        </Stack>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Images</Typography>
          <Field.Upload
            name="images"
            multiple
            maxSize={5242880}
            onDelete={(file) => handleRemoveFile('images', file)}
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderProperties = (
    <Card>
      <CardHeader
        title="Properties"
        subheader="Additional functions and attributes..."
        sx={{ mb: 3 }}
      />
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Autocomplete
          name="tags"
          label="Tags"
          placeholder="+ Tags"
          multiple
          freeSolo
          disableCloseOnSelect
          options={_tags}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />
        <Field.Text name="metaTitle" label="Meta title" />
        <Field.Text name="metaDescription" label="Meta description" fullWidth multiline rows={3} />
        <Field.Autocomplete
          name="metaKeywords"
          label="Meta keywords"
          placeholder="+ Keywords"
          multiple
          freeSolo
          disableCloseOnSelect
          options={_tags}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />
        <FormControlLabel
          control={<Switch defaultChecked inputProps={{ id: 'comments-switch' }} />}
          label="Enable comments"
        />
      </Stack>
    </Card>
  );

  const renderActions = (
    <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent="flex-end">
      <FormControlLabel
        control={<Switch defaultChecked inputProps={{ id: 'publish-switch' }} />}
        label="Publish"
        sx={{ pl: 3, flexGrow: 1 }}
      />
      <div>
        <Button color="inherit" variant="outlined" size="large" onClick={preview.onTrue}>
          Preview
        </Button>
        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentPostId ? 'Create post' : 'Save changes'}
        </LoadingButton>
      </div>
    </Box>
  );

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack spacing={5} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
          {renderDetails}
          {renderProperties}
          {renderActions}
        </Stack>
        <PostDetailsPreview
          isValid={isValid}
          onSubmit={onSubmit}
          title={values.title}
          open={preview.value}
          content={values.content}
          onClose={preview.onFalse}
          coverUrl={values.coverUrl}
          isSubmitting={isSubmitting}
          description={values.description}
        />
      </Form>

      {/* Liste des posts */}
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Posts
        </Typography>
        {posts.map((post) => (
          <Card key={post.id} sx={{ mb: 2, p: 2 }}>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2">{post.description}</Typography>
            {post.coverUrl && (
              <Box mt={2}>
                <img src={post.coverUrl} alt="Cover" style={{ maxWidth: '100%', height: 'auto' }} />
              </Box>
            )}
            {post.images && post.images.length > 0 && (
              <Box mt={2} display="flex" flexWrap="wrap">
                {post.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Image ${index + 1}`}
                    style={{ maxWidth: '100px', margin: '5px' }}
                  />
                ))}
              </Box>
            )}
            <Box mt={2}>
              <Button onClick={() => router.push(`/edit-post/${post.id}`)}>Edit</Button>
              <Button color="error" onClick={() => deletePost(post.id)}>
                Delete
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
}
