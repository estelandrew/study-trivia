import DeckCard from "@components/DeckCard/DeckCard";
import PageHeader from "@components/PageHeader/PageHeader";
import { getDecksByCategorySlug } from "@lib/supabase";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decks = await getDecksByCategorySlug(category);

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
