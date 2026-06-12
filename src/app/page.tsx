import { Branches } from "@/main/Home/Branches";
import Hero from "@/main/Home/Hero";
import PopularMenu from "@/main/Home/PopularMenu";
import { Services } from "@/main/Home/Services";
import SpecialOffer from "@/main/Home/SpecialOffer";

export default function Home() {
  return (
    <>
      <Hero />
      <SpecialOffer />
      <PopularMenu />
      <Services />
      <Branches />
    </>
  );
}
