import Carousel from "@/components/features/Carousel";
import Benefits from "@/components/features/Benefits";
import Callretail from "@/components/features/Callretail";
import Catalogproduct from "@/components/features/Catalogproduct";
import Gallery from "@/components/features/Gallery";



export default function Home() {
  return (
    <div className="mt-18 lg:mt-34">
      <div>
        <Carousel />
        <Benefits />
        <Callretail/>
        <Catalogproduct/>
        <Gallery limit={6} />
      </div>
    </div>
  );
}



