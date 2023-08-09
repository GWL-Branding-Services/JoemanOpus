import { ImageCollection } from "../assets";

const slides = [
    {
      image: ImageCollection.iphones,
      title: "Iphones",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti vero ipsa modi? Autem veniam beatae itaque sapiente delectus, commodi aut consequuntur quasi labore facilis tenetur natus veritatis sequi, iusto quia!",
      textAlignment: "justify-start",
      transition: "opacity duration-1000",
      otherText1: "Iph",
      otherText2: "ones",
      otherText1Style: "top-8 left-10",
      otherText2Style: "top-[12rem] left-0 text-left",
    },
    {
      image: ImageCollection.spoon,
      title: "A Spoon",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti vero ipsa modi? Autem veniam beatae itaque sapiente delectus, commodi aut consequuntur quasi labore facilis tenetur natus veritatis sequi, iusto quia!",
      textAlignment: "justify-center",
      transition: "duration-1000",
      otherText1: "Spo",
      otherText2: "on",
      otherText1Style: "top-16 right-14",
      otherText2Style: "top-[13rem] -right-12",
    },
    {
      image: ImageCollection.puzzles,
      title: "Puzzles",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti vero ipsa modi? Autem veniam beatae itaque sapiente delectus, commodi aut consequuntur quasi labore facilis tenetur natus veritatis sequi, iusto quia!",
      textAlignment: "justify-end",
      transition: "shadow duration-1000",
      otherText1: "Puz",
      otherText2: "zles",
      otherText1Style: "top-[11rem] left-[51px]",
      otherText2Style: "top-[22rem] -left-10",
    },
  ];


export { slides };