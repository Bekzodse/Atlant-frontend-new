import { licenseMetadata } from "@/data/metadata";
import LicenseGallery from "@/app/[locale]/license/components/LicenseGallery";

export const metadata = licenseMetadata;

export default function Licence() {
    return (
        <div className="mt-18 lg:mt-34">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <LicenseGallery/>
            </div>
        </div>
    );
}
