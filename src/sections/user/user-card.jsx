import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { useRouter } from 'src/routes/hooks';

import { fShortenNumber } from 'src/utils/format-number';

import { _socials } from 'src/_mock';
import { varAlpha } from 'src/theme/styles';
import { AvatarShape } from 'src/assets/illustrations';

import { Image } from 'src/components/image';
import { SocialIcon } from 'src/components/iconify';
import { useCallback } from 'react';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export function UserCard({ user }) {
  const router = useRouter();

  const handleUserProfile = useCallback(
    (id) => {
      router.push(paths.dashboard.user.profile(id));
    },
    [router]
  );

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <AvatarShape
          sx={{
            left: 0,
            right: 0,
            zIndex: 10,
            mx: 'auto',
            bottom: -26,
            position: 'absolute',
          }}
        />

        <Avatar
          alt={user.name}
          src={user.avatarUrl}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />

        <Image
          src={user.coverUrl}
          alt={user.coverUrl}
          ratio="16/9"
          slotProps={{
            overlay: {
              background: (theme) => varAlpha(theme.vars.palette.grey['900Channel'], 0.48),
            },
          }}
        />
      </Box>

      <Link component={RouterLink} href={paths.dashboard.user.profile(user.id)}>
        <ListItemText
          sx={{ mt: 7, mb: 1 }}
          primary={user.name}
          secondary={user.role}
          primaryTypographyProps={{ typography: 'subtitle1' }}
          secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
        />
      </Link>

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 2.5 }}>
        {_socials.map((social) => (
          <IconButton key={social.name}>
            <SocialIcon icon={social.name} />
          </IconButton>
        ))}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        sx={{ py: 3, typography: 'subtitle1' }}
      >
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Follower
          </Typography>
          {fShortenNumber(user.totalFollowers)}
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Following
          </Typography>

          {fShortenNumber(user.totalFollowing)}
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Total post
          </Typography>
          {fShortenNumber(user.totalPosts)}
        </div>
      </Box>
    </Card>
  );
}
