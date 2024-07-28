/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';
import { m } from 'framer-motion';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionDetails, { accordionDetailsClasses } from '@mui/material/AccordionDetails';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatPlusIcon, FloatTriangleDownIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

const FAQs = [
  {
    question: 'Quels types de chatbots AI pouvez-vous développer ?',
    answer: (
      <Typography>
        Je peux développer différents types de chatbots, notamment des chatbots de service client,
        des chatbots pour le commerce électronique, des chatbots éducatifs, et des chatbots de
        réservation, en fonction des besoins spécifiques de votre entreprise.
      </Typography>
    ),
  },
  {
    question:
      "Comment les chatbots AI peuvent-ils améliorer l'expérience client sur mon site web ?",
    answer: (
      <Typography>
        Les chatbots AI peuvent offrir une assistance 24/7, répondre instantanément aux questions
        fréquentes, guider les utilisateurs à travers votre site, et même effectuer des transactions
        simples, améliorant ainsi l'efficacité et la satisfaction des clients.
      </Typography>
    ),
  },
  {
    question:
      'Quelle est votre méthodologie pour concevoir une interface utilisateur (UI) attrayante ?',
    answer: (
      <Typography>
        Je commence par comprendre vos objectifs commerciaux et les besoins de vos utilisateurs,
        puis je crée des wireframes et des prototypes. J'effectue des tests utilisateurs pour
        affiner le design et m'assurer qu'il est à la fois esthétique et fonctionnel.
      </Typography>
    ),
  },
  {
    question: 'Pouvez-vous fournir des exemples de travaux précédents en UI & UX design ?',
    answer: (
      <Typography>
        Oui, je peux vous montrer des exemples de projets passés où j'ai conçu des interfaces
        utilisateur intuitives et des expériences utilisateur fluides. Ces exemples démontrent ma
        capacité à créer des designs qui engagent et satisfont les utilisateurs.
      </Typography>
    ),
  },
  {
    question:
      'Quels frameworks et bibliothèques utilisez-vous pour le développement web et mobile ?',
    answer: (
      <Typography>
        Pour le développement web, j'utilise des frameworks comme React.js et Angular. Pour le
        développement mobile, je travaille avec React Native et Flutter pour créer des applications
        performantes et cross-platform.
      </Typography>
    ),
  },
  {
    question:
      "Comment gérez-vous les mises à jour et l'évolution des applications après leur lancement ?",
    answer: (
      <Typography>
        Je propose des services de maintenance continue pour m'assurer que les applications restent
        à jour avec les dernières technologies et tendances. Je gère également les mises à jour en
        fonction des retours des utilisateurs et des besoins évolutifs de l'entreprise.
      </Typography>
    ),
  },
];

// ----------------------------------------------------------------------

export function HomeFAQs({ sx, ...other }) {
  const [expanded, setExpanded] = useState(FAQs[0].question);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderDescription = (
    <SectionTitle
      caption="FAQs"
      title="J'ai les"
      txtGradient="réponses"
      sx={{ textAlign: 'center' }}
    />
  );

  const renderContent = (
    <Stack
      spacing={1}
      sx={{
        mt: 8,
        mx: 'auto',
        maxWidth: 720,
        mb: { xs: 5, md: 8 },
      }}
    >
      {FAQs.map((item, index) => (
        <Accordion
          key={item.question}
          component={m.div}
          variants={varFade({ distance: 24 }).inUp}
          expanded={expanded === item.question}
          onChange={handleChange(item.question)}
          sx={{
            borderRadius: 2,
            transition: (theme) =>
              theme.transitions.create(['background-color'], {
                duration: theme.transitions.duration.short,
              }),
            '&::before': { display: 'none' },
            '&:hover': {
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
            },
            '&:first-of-type, &:last-of-type': { borderRadius: 2 },
            [`&.${accordionClasses.expanded}`]: {
              m: 0,
              borderRadius: 2,
              boxShadow: 'none',
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
            },
            [`& .${accordionSummaryClasses.root}`]: {
              py: 3,
              px: 2.5,
              minHeight: 'auto',
              [`& .${accordionSummaryClasses.content}`]: {
                m: 0,
                [`&.${accordionSummaryClasses.expanded}`]: { m: 0 },
              },
            },
            [`& .${accordionDetailsClasses.root}`]: { px: 2.5, pt: 0, pb: 3 },
          }}
        >
          <AccordionSummary
            expandIcon={
              <Iconify
                width={20}
                icon={expanded === item.question ? 'mingcute:minimize-line' : 'mingcute:add-line'}
              />
            }
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography variant="h6"> {item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>{item.answer}</AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );

  const renderContact = (
    <Stack
      alignItems="center"
      sx={{
        px: 3,
        py: 8,
        textAlign: 'center',
        background: (theme) =>
          `linear-gradient(270deg, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)})`,
      }}
    >
      <m.div variants={varFade().in}>
        <Typography variant="h4">Vous avez toujours des question?</Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography sx={{ mt: 2, mb: 3, color: 'text.secondary' }}>
          N'hésitez pas à nous contacter pour obtenir plus d'informations.
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Button
          color="inherit"
          variant="contained"
          href="mailto:jacques.steeven@gmail.com?subject=[Feedback] from Customer"
          startIcon={<Iconify icon="fluent:mail-24-filled" />}
        >
          Me contacter
        </Button>
      </m.div>
    </Stack>
  );

  return (
    <Stack component="section" sx={{ ...sx }} {...other}>
      <MotionViewport sx={{ py: 10, position: 'relative' }}>
        <TopLines />

        <Container>
          {renderDescription}
          {renderContent}
        </Container>

        <Stack sx={{ position: 'relative' }}>
          <BottomLines />
          {renderContact}
        </Stack>
      </MotionViewport>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function TopLines() {
  return (
    <>
      <Stack
        spacing={8}
        alignItems="center"
        sx={{
          top: 64,
          left: 80,
          position: 'absolute',
          transform: 'translateX(-15px)',
        }}
      >
        <FloatTriangleDownIcon sx={{ position: 'static', opacity: 0.12 }} />
        <FloatTriangleDownIcon
          sx={{
            position: 'static',
            opacity: 0.24,
            width: 30,
            height: 15,
          }}
        />
      </Stack>
      <FloatLine vertical sx={{ top: 0, left: 80 }} />
    </>
  );
}

function BottomLines() {
  return (
    <>
      <FloatLine sx={{ top: 0, left: 0 }} />
      <FloatLine sx={{ bottom: 0, left: 0 }} />
      <FloatPlusIcon sx={{ top: -8, left: 72 }} />
      <FloatPlusIcon sx={{ bottom: -8, left: 72 }} />
    </>
  );
}
