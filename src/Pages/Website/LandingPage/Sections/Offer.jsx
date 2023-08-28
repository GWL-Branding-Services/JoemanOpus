import {
    createStyles,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem,
  } from '@mantine/core';
  import { IconMusic, IconVolume2 } from '@tabler/icons-react';
import { buttonTheme } from '../../../../Data/GeneralData';
  
  const mockdata = [
    {
      title: 'Viscount Organs - Elevate Your Musical Expression:',
      description:
        "Experience music's allure with Viscount Organs – meticulously crafted for rich, authentic sounds. For musicians of all levels, our range caters to diverse musical preferences.",
      icon: IconMusic,
    },
    {
      title: 'Enhance the Sound - Premium Speakers for Unrivaled Audio:',
      description:
      "To enhance our Viscount Organs, explore our curated premium speaker range. Elevate your music with clear, amplified notes, perfect for performances, practice, and gatherings.",
      icon: IconVolume2,
    },
  ];
  
  const useStyles = createStyles((theme) => ({
    title: {
      fontSize: rem(34),
      fontWeight: 900,
  
      [theme.fn.smallerThan('sm')]: {
        fontSize: rem(24),
      },
    },
  
    description: {
      maxWidth: 600,
      margin: 'auto',
  
      '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: theme.fn.primaryColor(),
        width: rem(45),
        height: rem(2),
        marginTop: theme.spacing.sm,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  
    card: {
      border: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
    },
  
    cardTitle: {
      '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: buttonTheme.primary,
        width: rem(45),
        height: rem(2),
        marginTop: theme.spacing.sm,
      },
    },
  }));
  
  export default function Offer() {
    const { classes } = useStyles();
    const features = mockdata.map((feature) => (
      <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
        <feature.icon size={rem(50)} stroke={2} className="text-gwltheme" />
        <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
          {feature.title}
        </Text>
        <Text fz="sm"  mt="sm">
          {feature.description}
        </Text>
      </Card>
    ));
  
    return (
      <Container size="lg" py="xl" className='mt-14'>
  
        <Title order={2} className={classes.title} ta="center" mt="sm">
          What we offer
        </Title>

  
        <SimpleGrid cols={2} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          {features}
        </SimpleGrid>
      </Container>
    );
  }