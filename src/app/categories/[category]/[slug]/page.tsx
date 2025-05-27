import { getDeckBySlug } from "@lib/supabase";
//import DeckPage from "./_components/DeckPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deck = await getDeckBySlug(slug);
  console.log(">>> deck: ", deck);
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
