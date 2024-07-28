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

export function CguView() {
  const pageProgress = useScrollProgress();

  const cgu = [
    {
      id: 1,
      title: "Date d'entrée en vigueur : 28 Juin 2024",
      content:
        "Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation de l'application mobile PlantMed, dédiée aux plantes médicinales. En utilisant l'application, vous acceptez d'être lié par ces CGU.",
    },
    {
      id: 2,
      title: "Objet de l'application",
      content:
        "PlantMed est une application mobile fournissant des informations sur les plantes médicinales, leurs propriétés et leurs utilisations traditionnelles. L'application est destinée à un usage informatif uniquement et ne remplace en aucun cas les conseils d'un professionnel de santé qualifié.",
    },
    {
      id: 3,
      title: "Utilisation de l'application",
      content:
        "Vous vous engagez à utiliser l'application conformément aux lois en vigueur et à ces CGU. Il est interdit d'utiliser l'application à des fins illégales ou non autorisées. Vous êtes responsable de la confidentialité de votre compte et de vos informations d'identification.",
    },
    {
      id: 4,
      title: 'Contenu et propriété intellectuelle',
      content:
        "Tout le contenu présent dans l'application, y compris les textes, images, et logos, est protégé par les droits de propriété intellectuelle. Vous n'êtes pas autorisé à reproduire, distribuer, ou modifier ce contenu sans autorisation expresse.",
    },
    {
      id: 5,
      title: 'Limitation de responsabilité',
      content:
        "Les informations fournies par l'application sont à titre indicatif seulement. Nous ne garantissons pas l'exactitude, l'exhaustivité ou l'actualité de ces informations. L'utilisation de ces informations se fait à vos propres risques. Consultez toujours un professionnel de santé avant d'utiliser des plantes médicinales.",
    },
    {
      id: 6,
      title: 'Modifications des CGU',
      content:
        "Nous nous réservons le droit de modifier ces CGU à tout moment. Les modifications prendront effet dès leur publication dans l'application. Il est de votre responsabilité de consulter régulièrement les CGU.",
    },
    {
      id: 7,
      title: 'Résiliation',
      content:
        "Nous nous réservons le droit de suspendre ou de résilier votre accès à l'application en cas de violation de ces CGU ou pour toute autre raison à notre discrétion.",
    },
    {
      id: 8,
      title: 'Loi applicable',
      content:
        'Ces CGU sont régies par les lois en vigueur dans votre pays de résidence. Tout litige relatif à ces CGU sera soumis à la juridiction compétente de votre lieu de résidence.',
    },
    {
      id: 9,
      title: 'Contact',
      content:
        "Pour toute question concernant ces CGU ou l'utilisation de l'application, veuillez nous contacter à contact@jsprod.com.",
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

        {cgu.map((article, index) => (
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
