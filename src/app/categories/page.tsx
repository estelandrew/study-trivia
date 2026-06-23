import PageSection from "@components/PageSection/PageSection";
import CategoriesGrid from "@components/CategoriesGrid/CategoriesGrid";
import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";

export default async function Page() {
  return (
    <ContentWrapper>
      <PageSection headerText="Categories">
        <CategoriesGrid />
      </PageSection>
    </ContentWrapper>
  );
}
