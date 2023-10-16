import { getDeckBySlug } from "@lib/supabase";
import PageSection from "@components/PageSection/PageSection";
import PageHeader from "@components/PageHeader/PageHeader";
import { GridDisplay } from "@components/GridDisplay/GridDisplay";

export default async function Page({ params }: { params: { slug: string } }) {
  const deck = await getDeckBySlug(params.slug);
  return (
    <>
      {/* TODO: figure out why Typescript is seems to be interpreting the returned data incorrectly. Possibly override data type returned from fetch? */}
      {/*@ts-ignore*/}
      <PageHeader text={deck?.name} categorySlug={deck?.categories.slug} />
      {/*@ts-ignore*/}
      <GridDisplay deckData={deck} />
    </>
  );
}
