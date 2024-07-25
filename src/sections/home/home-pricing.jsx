import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CustomPricingCard } from 'src/sections/pricing/custom-pricing-card';

// ----------------------------------------------------------------------

const _pricingPlans = [
  {
    subscription: 'basic',
    price: 29.99,
    caption: 'Forever',
    lists: [
      'Chatbot IA simple',
      'Jusqu\'à 1000 interactions par mois',
      'Intégration sur site web et Facebook Messenger',
      'Réponses préprogrammées et apprentissage limité',
      'Support par email',
    ],
    labelAction: 'Current plan',
  },
  {
    subscription: 'pro',
    price: 99.99,
    caption: 'Saving $24 a year',
    lists: [
      'Chatbot IA avancé avec apprentissage automatique',
      'Jusqu\'à 10 000 interactions par mois',
      'Intégration multi-plateforme (site web, réseaux sociaux, applications mobiles)',
      'Personnalisation de l\'avatar et de la voix',
      'Analyses et rapports détaillés',
      'Support prioritaire par chat et email',
    ],
    labelAction: 'Choose starter',
  },
  {
    subscription: 'entreprise',
    price: 499.99,
    caption: 'Saving $124 a year',
    lists: [
      'Chatbot IA haute performance avec traitement du langage naturel avancé',
      'Interactions illimitées',
      'Intégration sur mesure avec vos systèmes existants',
      'Apprentissage continu et amélioration automatique',
      'Gestion multi-langue',
      'Tableaux de bord en temps réel et analyses prédictives',
      'Support dédié 24/7 avec un gestionnaire de compte',
    ],
    labelAction: 'Choose entreprise ',
  },
];

// ----------------------------------------------------------------------

export function HomePricing({ sx }) {
  return (
    <Container sx={{ pt: 5, pb: 10 }}>
      <Typography variant="h3" align="center" sx={{ mb: 2 }}>
        Flexible plans for your
        <br /> {`community's size and needs`}
      </Typography>

      <Typography align="center" sx={{ color: 'text.secondary' }}>
        Choose your plan and make modern online conversation magic
      </Typography>

      <Box
        gap={{ xs: 3, md: 0 }}
        display="grid"
        alignItems={{ md: 'center' }}
        gridTemplateColumns={{ md: 'repeat(3, 1fr)' }}
      >
        {_pricingPlans.map((card, index) => (
          <CustomPricingCard key={card.subscription} card={card} index={index} />
        ))}
      </Box>
    </Container>
  );
}
