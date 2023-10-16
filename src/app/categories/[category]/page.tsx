import { getDecksByCategorySlug } from "@lib/supabase";
import DeckCard from "@components/DeckCard/DeckCard";
import { PageHeader } from "@components/PageHeader/PageHeader";

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const decks = await getDecksByCategorySlug(params.category);
  return (
    <>
      <PageHeader
        text={`Category: ${decks?.name}`}
        categorySlug={decks?.slug}
      />
      {decks?.decks.map((deck) => {
        return (
          <DeckCard
            key={deck.id}
            category={decks.slug}
            name={deck.name}
            description={deck.description}
            slug={deck.slug}
          />
        );
      })}
    </>
  );
}
