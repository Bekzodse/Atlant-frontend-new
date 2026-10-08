import AccordionAbout from "./components/AccordionAbout";
import { aboutMetadata } from "@/data/metadata";

export const metadata = aboutMetadata;

export default function Home() {
    return (
        <div className={"mt-18 lg:mt-34"}>
            <AccordionAbout/>
        </div>
    );
}
