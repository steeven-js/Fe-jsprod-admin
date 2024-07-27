import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CustomPricingCard } from 'src/sections/pricing/custom-pricing-card';

// ----------------------------------------------------------------------

const _pricingPlans = [
  {
    subscription: 'basic',
    price: 299.99,
    caption:
      "Parfait pour les petites entreprises ou les startups, ce forfait comprend la création d'un chatbot simple avec des fonctionnalités de base pour répondre aux questions fréquemment posées.",
    lists: [
      'Chatbot IA simple',
      "Jusqu'à 1000 interactions par mois",
      'Intégration sur site web et Facebook Messenger',
      'Réponses préprogrammées et apprentissage limité',
      'Support par email',
    ],
    labelAction: 'Current plan',
  },
  {
    subscription: 'pro',
    price: 599.99,
    caption:
      'Idéal pour les entreprises de taille moyenne, ce forfait offre un chatbot plus avancé avec des capacités de personnalisation et une intégration à vos systèmes existants.',
    lists: [
      'Chatbot IA avancé avec apprentissage automatique',
      "Jusqu'à 10 000 interactions par mois",
      'Intégration multi-plateforme (site web, réseaux sociaux, applications mobiles)',
      "Personnalisation de l'avatar et de la voix",
      'Analyses et rapports détaillés',
      'Support prioritaire par chat et email',
    ],
    labelAction: 'Choose starter',
  },
  {
    subscription: 'entreprise',
    price: 999.99,
    caption:
      'Conçu pour les grandes entreprises, ce forfait propose un chatbot entièrement personnalisé avec des fonctionnalités avancées, une intégration complète et un support dédié.',
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
        Plans Flexibles pour
        <br /> Vos Besoins et Votre Budget
      </Typography>

      <Typography align="center" sx={{ color: 'text.secondary' }}>
        Découvrez nos offres de création de chatbots adaptées à tous les besoins et budgets. Que
        vous soyez une petite entreprise cherchant à automatiser vos réponses client ou une grande
        société souhaitant un chatbot personnalisé et sophistiqué, nous avons la solution idéale
        pour vous.{' '}
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
