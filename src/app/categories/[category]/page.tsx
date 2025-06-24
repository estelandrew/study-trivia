import DeckCardsGrid from "@components/DeckCardsGrid/DeckCardsGrid";
import PageSection from "@/components/PageSection/PageSection";
import { getDecksByCategorySlug } from "@lib/supabase";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decks = await getDecksByCategorySlug(category);

  return (
    <PageSection headerText={decks?.name}>
      <DeckCardsGrid data={decks} category={decks?.slug} />
    </PageSection>
  );
}
