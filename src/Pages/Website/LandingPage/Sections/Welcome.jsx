/* eslint-disable react/prop-types */
import {
  //   Image,
  Text,
  Container,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
// import IMAGES from "./images";

const useStyles = createStyles((theme) => ({
 
  title: {
    lineHeight: 1,
    textAlign: "center",
    marginTop: theme.spacing.xl,
  },

  description: {
    textAlign: "center",
    marginTop: theme.spacing.xs,
  },

  highlight: {
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    padding: rem(5),
    paddingTop: 0,
    borderRadius: theme.radius.sm,
    display: "inline-block",
    color: theme.colorScheme === "dark" ? theme.white : "inherit",
  },
}));

export default function Welcome({ description }) {
  const { classes } = useStyles();

  return (
    <Container
      size={700}
      className={`bg-white px-4 py-9  rounded-xl shadow-xl mx-4 md:mx-auto -mt-8 mb-5 relative`}
    >
      <Title className={classes.title} order={2}>
        Welcome to Joeman Opus - Your Gateway to Extraordinary Musical Organs
      </Title>

      <Container size={660} p={0}>
        <Text color="dimmed" className={classes.description}>
          {description}
        </Text>
        <Text className="mt-4">
          Are you in search of unparalleled musical experiences? Look no
          further! At Joeman Opus, we are dedicated to curating a delightful
          collection of Viscount Organs and high-quality speakers, designed to
          elevate your musical journey to new heights. Discover the perfect
          harmony of innovation, craftsmanship, and exceptional sound with our
          premium selection.
        </Text>
      </Container>

    </Container>
  );
}
