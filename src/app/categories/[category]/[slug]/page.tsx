import { getDeckBySlug } from "@lib/supabase";
import PageSection from "@components/PageSection/PageSection";
import PageHeader from "@components/PageHeader/PageHeader";
import { GridDisplay } from "@components/GridDisplay/GridDisplay";
import { ButtonWithDropdown } from "@components/ButtonWithDropdown/ButtonWithDropdown";
import styles from "./page.module.scss";

export default async function Page({ params }: { params: { slug: string } }) {
  const deck = await getDeckBySlug(params.slug);
  return (
    <>
      {/* TODO: figure out why Typescript is seems to be interpreting the returned data incorrectly. Possibly override data type returned from fetch? */}
      {/*@ts-ignore*/}
      <PageHeader
        text={deck?.name}
        description={deck?.description}
        categorySlug={deck?.categories.slug}
      />
      <div className={styles.row}>{deck?.cards.length} Rows</div>
      {/*@ts-ignore*/}
      <div className={styles.toolbar}>
        <ButtonWithDropdown text="View">
          <div>Child container</div>
        </ButtonWithDropdown>
      </div>
      <GridDisplay deckData={deck} />
    </>
  );
}
