import { m } from 'framer-motion';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import {
  varFade,
  BackToTop,
  MotionViewport,
  ScrollProgress,
  useScrollProgress,
} from 'src/components/animate';

export function PolicyView() {
  const pageProgress = useScrollProgress();

  const policy = [
    {
      id: 1,
      title: "Date d'entrée en vigueur : 05 Février 2024",
      content:
        "Cette Politique de Confidentialité décrit la manière dont les informations sont collectées, utilisées et partagées lorsque vous utilisez l'application mobile de plantes médicinales (ci-après dénommée 'PlantMed').",
    },
    {
      id: 2,
      title: 'Collecte et Utilisation des Informations',
      content:
        "Nous ne collectons aucune information personnelle identifiable lorsque vous utilisez l'Application. Toutefois, l'Application peut collecter automatiquement certaines informations non personnelles, telles que le type de dispositif mobile que vous utilisez, l'identifiant unique de votre appareil, la version du système d'exploitation de votre appareil et des informations sur la manière dont vous utilisez l'Application. Ces informations sont utilisées dans le but d'améliorer la fonctionnalité de l'Application et de fournir un service de meilleure qualité.",
    },
    {
      id: 3,
      title: 'Partage des Informations',
      content:
        "Nous ne partageons aucune information personnelle identifiable collectée par le biais de l'Application. Nous pouvons partager des informations non personnelles avec des fournisseurs de services tiers engagés pour nous aider à exploiter et à améliorer l'Application. Ces tiers n'ont pas le droit d'utiliser les informations que nous leur fournissons à d'autres fins que celles de nous aider.",
    },
    {
      id: 4,
      title: 'Sécurité',
      content:
        "Nous prenons des mesures raisonnables pour protéger les informations non personnelles collectées par le biais de l'Application contre la perte, le vol, l'accès non autorisé, la divulgation, la modification ou la destruction.",
    },
    {
      id: 5,
      title: 'Modifications de la Politique de Confidentialité',
      content:
        'Nous nous réservons le droit de mettre à jour cette Politique de Confidentialité à tout moment. Nous vous recommandons de consulter régulièrement cette page pour prendre connaissance de toute modification. Les modifications apportées à cette Politique de Confidentialité entrent en vigueur dès leur publication sur cette page.',
    },
    {
      id: 6,
      title: 'Contactez-nous',
      content:
        "Si vous avez des questions ou des préoccupations concernant cette Politique de Confidentialité, veuillez nous contacter à contact@jsprod.fr. En utilisant l'Application, vous consentez à cette Politique de Confidentialité.",
    },
  ];

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <Container component={MotionViewport} sx={{ textAlign: 'center', py: { xs: 10, md: 15 } }}>
        <m.div variants={varFade().inDown}>
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Legal
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Typography variant="h2" sx={{ my: 3 }}>
            Conditions générales d&apos;utilisation
          </Typography>
        </m.div>

        {policy.map((article, index) => (
          <m.div key={index} variants={varFade().inUp}>
            <Typography
              sx={{ mx: 'auto', textAlign: 'left', maxWidth: 640, color: 'text.primary', mt: 4 }}
            >
              {article.title}
            </Typography>

            <Typography
              sx={{ mx: 'auto', textAlign: 'left', maxWidth: 640, color: 'text.secondary', mt: 2 }}
            >
              {article.content}
            </Typography>
          </m.div>
        ))}
      </Container>
    </>
  );
}
