import EntriesTable from "@/components/EntriesTable/EntriesTable";
import EntriesTableContextProvider from "@/context/EntriesTableContext/EntriesTableContext";
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
        <EntriesTableContextProvider
          collectionJoinEntries={collectionJoinEntries}
        >
          <EntriesTable collectionJoinEntries={collectionJoinEntries} />
        </EntriesTableContextProvider>
      ) : (
        <p>No collection found</p>
      )}
    </>
  );
}
