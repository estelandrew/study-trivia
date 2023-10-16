import PageSection from "@components/PageSection/PageSection";
import CategoriesGrid from "@components/CategoriesGrid/CategoriesGrid";

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <PageSection headerText="Categories">
      <CategoriesGrid />
    </PageSection>
  );
}
