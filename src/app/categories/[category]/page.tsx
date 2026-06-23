import CollectionCardsGrid from "@/components/CollectionCardsGrid/CollectionCardsGrid";
import PageSection from "@/components/PageSection/PageSection";
import ContentWrapper from "@/components/ContentWrapper/ContentWrapper";
import { getCollectionsByCategorySlug } from "@/lib/api";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const collections = await getCollectionsByCategorySlug(category);

  return (
    <ContentWrapper>
      <PageSection headerText={collections?.name || ""}>
        {collections && (
          <CollectionCardsGrid categoryJoinCollections={collections} />
        )}
      </PageSection>
    </ContentWrapper>
  );
}
