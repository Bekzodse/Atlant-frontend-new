import CatalogMain from "../components/CatalogMain";

export const metadata = {
  title: "Product Catalog - Atlant Fortuna",
  description: "Browse our complete catalog of water purification equipment and filters",
};

export default function CatalogPage() {
  return (
    <div className="mt-18 lg:mt-34">
      <CatalogMain />
    </div>
  );
}
