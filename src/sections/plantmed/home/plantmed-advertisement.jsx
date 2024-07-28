import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { CONFIG } from 'src/config-global';
import { varAlpha, textGradient } from 'src/theme/styles';

import { SvgColor } from 'src/components/svg-color';
import { varFade, MotionViewport } from 'src/components/animate';
import AppStoreButtons from 'src/components/app-store-buttons/appStoreButtons ';

import { FloatLine, FloatPlusIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

export function PlantmedAdvertisement({ sx, ...other }) {
  const theme = useTheme();

  const renderLines = (
    <>
      <FloatPlusIcon sx={{ left: 72, top: '50%', mt: -1 }} />
      <FloatLine vertical sx={{ top: 0, left: 80, height: 'calc(50% + 64px)' }} />
      <FloatLine sx={{ top: '50%', left: 0 }} />
    </>
  );

  const renderDescription = (
    <Stack spacing={5} sx={{ zIndex: 9 }}>
      <Box
        component={m.h2}
        variants={varFade({ distance: 24 }).inDown}
        sx={{ m: 0, color: 'common.white', typography: { xs: 'h2', md: 'h1' } }}
      >
        Explorez le pouvoir des
        <Box
          component="span"
          sx={{
            ...textGradient(
              `to right, ${theme.vars.palette.common.white}, ${varAlpha(
                theme.vars.palette.common.whiteChannel,
                0.4
              )}`
            ),
            ml: 1,
          }}
        >
          plantes.
        </Box>
      </Box>

      <Stack
        spacing={2}
        direction="row"
        flexWrap="wrap"
        justifyContent={{ xs: 'center', md: 'flex-start' }}
      >
        <AppStoreButtons />
      </Stack>
    </Stack>
  );

  const renderImg = (
    <m.div variants={varFade().inUp}>
      <Box
        component={m.img}
        animate={{ y: [-20, 0, -20] }}
        transition={{ duration: 4, repeat: Infinity }}
        alt="rocket"
        src={`${CONFIG.site.basePath}/assets/illustrations/illustration-logo.png`}
        sx={{ zIndex: 9, width: 360, aspectRatio: '1/1' }}
      />
    </m.div>
  );

  const renderGridBg = (
    <m.div variants={varFade().in}>
      <SvgColor
        src={`${CONFIG.site.basePath}/assets/background/shape-grid.svg`}
        sx={{
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          zIndex: 8,
          opacity: 0.08,
          color: 'grey.500',
          position: 'absolute',
          maskSize: 'auto 100%',
        }}
      />
    </m.div>
  );

  const renderBlur = (
    <Box
      sx={{
        top: 0,
        right: 0,
        zIndex: 7,
        width: 240,
        height: 240,
        bgcolor: 'grey.500',
        position: 'absolute',
        filter: 'blur(200px)',
      }}
    />
  );

  return (
    <Stack component="section" sx={{ position: 'relative', ...sx }} {...other}>
      <MotionViewport>
        {renderLines}

        <Container sx={{ position: 'relative', zIndex: 9 }}>
          <Stack
            spacing={5}
            alignItems="center"
            direction={{ xs: 'column', md: 'row' }}
            sx={{
              py: 8,
              px: 5,
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: 'grey.900',
              position: 'relative',
              textAlign: { xs: 'center', md: 'left' },
              border: `solid 1px ${theme.vars.palette.grey[800]}`,
            }}
          >
            {renderImg}

            {renderDescription}

            {renderGridBg}

            {renderBlur}
          </Stack>
        </Container>
      </MotionViewport>
    </Stack>
  );
}
