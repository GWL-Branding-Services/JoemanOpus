import {
  createStyles,
  Container,
  Group,
  rem,
  Image,
  Tooltip,
} from "@mantine/core";
import { IconMail, IconMapPin, IconPhoneCall } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { ImageCollection } from "../../assets";
import { navigationRight } from "../../Data/GeneralData";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

const contactInfo = [
  {
    label: "Phone Number",
    href: "tel:09054113981",
    icon: <IconPhoneCall />,
  },
  {
    label: "Email",
    href: "mailto:joemanopuslimited@gmail.com",
    icon: <IconMail />,
  },
  {
    label: "Location",
    href: "https://www.google.com/maps?q=24+Sobowale+street,+Egbeda+Road,+Akowonjo,+Lagos",
    icon: <IconMapPin />,
  },
];

export default function Footer() {
  const { classes } = useStyles();
  const navLinks = navigationRight.map((link, index) => (
    <Link
      color="dimmed"
      key={index}
      to={link.href}
      size="sm"
      className="hover:text-gwltheme transition"
    >
      {link.name}
    </Link>
  ));

  

  const contactLinks = contactInfo.map((info, index) => (
    <Tooltip key={index} label={info.label} className="">
      <Link
        to={info.href}
        className="hover:text-gwltheme transition duration-300 hover:scale-110"
        target="_blank" 
        rel="noopener noreferrer" // Recommended for security reasons
      >
        {info.icon}
      </Link>
    </Tooltip>
  ));

  return (
    <div className={` ${classes.footer}`}>
      <Container className={classes.inner}>
        <Link className="-m-1.5 p-1.5" to="/">
          <span className="h-8 w-auto text-xl font-light">
            <Image src={ImageCollection.logo} width={170} />
            <p>Joseman Opus</p>
          </span>
        </Link>
        <div className="flex gap-6 max-md:mt-4 max-md:-ml-5">{contactLinks}</div>
        <Group
          className={`${classes.links} px-4`}
        >
          {navLinks}
        </Group>
      </Container>
    </div>
  );
}
