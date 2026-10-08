import Categoryforproduct from "./components/Categoryforproduct";
import { categoryMetadata } from "@/data/metadata";

export const metadata = categoryMetadata;

export default function Home() {
    return (
        <div className={"mt-18 lg:mt-34"}>
            <Categoryforproduct/>
        </div>
    );
}
