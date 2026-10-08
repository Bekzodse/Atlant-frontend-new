import Delivery from "./components/Delivery";
import { paymentDeliveryMetadata } from "@/data/metadata";

export const metadata = paymentDeliveryMetadata;

export default function Home() {
    return (
        <div className={"mt-18 lg:mt-34"}>
            <Delivery/>
        </div>
    );
}
