import Gallery from "@/components/features/Gallery";
import { photoGalleryMetadata } from "@/data/metadata";

export const metadata = photoGalleryMetadata;

export default function PhotoGallery() {
  return (
    <div className="mt-32">
      <Gallery showButton={false} />
    </div>
  );
}
