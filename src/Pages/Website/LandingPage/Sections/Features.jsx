import {
  createStyles,
  Title,
  Text,
  Grid,
  Col,
  rem,
} from "@mantine/core";
import { ImageCollection } from "../../../../assets";

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `calc(${theme.spacing.xl} * 2) ${theme.spacing.xl}`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(25),
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));

const features = [
  {
    image: ImageCollection.firstOrgan,
    title: "Unrivaled Quality - Craftsmanship Meets Innovation:",
    description:
      "We take pride in offering musical instruments that exude excellence. Each Viscount Organ in our collection is a masterpiece, thoughtfully engineered to deliver an immersive musical experience. Our speakers are carefully chosen to complement the organs, providing you with a harmonious and mesmerizing sound journey.",
  },
  {
    image: ImageCollection.secondOrgan,
    title: "Expert Guidance - Making Your Melodies Soar:",
    description:
      "Our team of passionate music enthusiasts is here to guide you through your musical odyssey. Whether you're a novice seeking advice on the perfect organ or a professional looking for specific features, we provide personalized assistance to ensure you make an informed choice.",
    style:"flex-row-reverse"
  },
  {
    image: ImageCollection.pedal,
    title: "Unmatched Selection - Find Your Perfect Match:",
    description:
      "With a diverse range of Viscount Organs and speakers, you're bound to find your ideal match. From classic elegance to modern versatility, we offer options that suit every taste and style. Let us help you find the perfect combination that resonates with your musical vision.",
  },
];

export default function Features() {
  const { classes } = useStyles();

  return (
    <div className={`bg-gray-100 mt-32 ${classes.wrapper}`}>
      <Text className={`text-center pb-8 font-extrabold text-[2rem] leading-[30px]`} >Why Choose Joeman Opus</Text>
      {features.map((feature, index) => (
        <Grid gutter={80} className={`${feature.style} lg:mt-5`} key={index}>
        <Col span={12} md={5}>
          <Title className={classes.title} order={2}>
            {feature.title}
          </Title>
          <Text>
            {feature.description}
          </Text>
        </Col>
        <Col span={12} md={7}>
          <img
            src={feature.image}
            alt="Feature Image"
            className="h-[75%] w-[100%] object-cover rounded-lg lg:h-[280px]"
          />
        </Col>
      </Grid>
      ))}
      
    </div>
  );
}
