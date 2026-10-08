import Contactsesion from "./components/Contactsesion";
import { contactMetadata } from "@/data/metadata";

export const metadata = contactMetadata;

export default function Home() {
    return (
        <div className="mt-18 lg:mt-34">
            <Contactsesion />
        </div>
    );
}
