import EntriesTable from "@/components/EntriesTable/EntriesTable";
import { getCollectionBySlug } from "@/lib/api";

export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collectionJoinEntries = await getCollectionBySlug(slug);
  console.log({ collectionJoinEntries });
  return (
    <>
      {collectionJoinEntries ? (
        <EntriesTable collectionJoinEntries={collectionJoinEntries} />
      ) : (
        <p>No collection found</p>
      )}
    </>
  );
}
