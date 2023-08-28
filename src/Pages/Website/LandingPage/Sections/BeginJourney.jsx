/* eslint-disable no-undef */
import { createStyles, Title, Text, Grid, Col, rem, Button } from "@mantine/core";
import { ImageCollection } from "../../../../assets";
import { buttonTheme } from "../../../../Data/GeneralData";

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `calc(${theme.spacing.xl} * 2) ${theme.spacing.xl}`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(30),
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));


export default function BeginJourney() {
  const { classes } = useStyles();

  return (
    <div className={`mt-32 ${classes.wrapper}`}>
      <Grid gutter={80}>
        <Col span={12} md={7}>
          <img
            src={ImageCollection.firstOrgan}
            alt="Feature Image"
            className="h-[300px] w-[100%] object-cover rounded-lg"
          />
        </Col>
        <Col span={12} md={5}>
          <Title className={classes.title} order={2}>
            Begin Your Melodic Journey Today
          </Title>
          <Text>
            At Joeman Opus, we are committed to enhancing your musical
            endeavors. Embrace the beauty of music with our premium Viscount
            Organs and speakers, and let your melodies soar to new heights.
            Explore our collection and let your passion for music come to life.
          </Text>
          <Button
              variant="default"
              className="mt-4 bg-white hover:border hover:border-gwltheme  hover:bg-gwltheme hover:text-white relative top-0 hover:top-3 duration-500 transition-all 
              ease-in-out "
              color={buttonTheme.primary}
              size="md"
              component="a"
              href={`/product/Shop/All Products`}
            >
              Explore Our Collection
            </Button>
        </Col>
      </Grid>
    </div>
  );
}
