import Stack from '@mui/material/Stack';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { HomeHero } from '../home-hero';
import { HomeFAQs } from '../home-faqs';
import { HomeZoneUI } from '../home-zone-ui';
import { HomeMinimal } from '../home-minimal';
import { HomePricing } from '../home-pricing';
import { HomeIntegrations } from '../home-integrations';
// import { HomeAdvertisement } from '../home-advertisement';
import { HomeHighlightFeatures } from '../home-highlight-features';

// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <HomeHero />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <HomeZoneUI />

        <HomeMinimal />

        <HomeHighlightFeatures />

        <HomeIntegrations />

        <HomePricing />

        <HomeFAQs />

        {/* <HomeAdvertisement /> */}
      </Stack>
    </>
  );
}
