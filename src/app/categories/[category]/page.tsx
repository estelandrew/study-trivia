import CollectionCardsGrid from "@/components/CollectionCardsGrid/CollectionCardsGrid";
import PageSection from "@/components/PageSection/PageSection";
import { getCollectionsByCategorySlug } from "@/lib/api";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const collections = await getCollectionsByCategorySlug(category);

  return (
    <PageSection headerText={collections?.name}>
      {collections && (
        <CollectionCardsGrid categoryJoinCollections={collections} />
      )}
    </PageSection>
  );
}
