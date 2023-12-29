import { getDeckBySlug } from "@lib/supabase";
import DeckPage from "./_components/DeckPage";

export default async function Page({ params }: { params: { slug: string } }) {
  const deck = await getDeckBySlug(params.slug);
  return <DeckPage data={deck} />;
}
