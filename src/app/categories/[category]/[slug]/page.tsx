import { getDeckBySlug } from "@lib/supabase";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deck = await getDeckBySlug(slug);
  return (
    <>
      {deck?.name && deck.cards.length && (
        <div>
          {deck.cards.map((card) => {
            return (
              <div key={card.id}>
                {card.clue}: {card.answer}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
