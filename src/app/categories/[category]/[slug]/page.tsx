import { luckiestGuy } from "@utils/fonts";
import ContentWrapper from "@components/ContentWrapper/ContentWrapper";
import StudyTable from "@/components/StudyTable/StudyTable";
import EntriesTable from "@/components/EntriesTable/EntriesTable";
//import EntriesTableContextProvider from "@/context/EntriesTableContext/EntriesTableContext";
import { getCollectionBySlug } from "@/lib/api";

export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collectionJoinEntries = await getCollectionBySlug(slug);
  return (
    <>
      {collectionJoinEntries ? (
        <>
          <ContentWrapper>
            <h2 className={`${luckiestGuy.className}`}>
              {collectionJoinEntries.name}
            </h2>
            <div>{collectionJoinEntries.description}</div>
          </ContentWrapper>
          <StudyTable collectionJoinEntries={collectionJoinEntries} />
          {/* <EntriesTable collectionJoinEntries={collectionJoinEntries} /> */}
        </>
      ) : (
        <p>No collection found</p>
      )}
    </>
  );
}
