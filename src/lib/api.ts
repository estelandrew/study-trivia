import supabase from "@utils/supabase";

export const getCollections = async () => {
  const { data: collections } = await supabase.from("collections").select(`
    id,
    name,
    description,
    entries (id, clue, answer)
  `);
  return collections;
};

export const getCategories = async () => {
  const { data: categories } = await supabase.from("categories").select(`
    id,
    slug,
    name
  `);
  return categories;
};

export const getCollectionBySlug = async (slug: string) => {
  const { data: collections } = await supabase
    .from("collections")
    .select(
      `
    id,
    slug,
    name,
    description,
    categories (slug),
    entries:entries!entries_collection_id_fkey (id, clue, answer)
  `
    )
    .eq("slug", slug)
    .maybeSingle();
  return collections;
};

export const getCollectionsByCategorySlug = async (slug: string) => {
  const { data: collections } = await supabase
    .from("categories")
    .select(
      `
    id,
    slug,
    name,
    description,
    collections (id, slug, name, description)
  `
    )
    .eq("slug", slug)
    .maybeSingle();
  return collections;
};

export const getLearnedEntries = async (userId: string) => {
  const { data: learnedEntries } = await supabase
    .from("learned_entries")
    .select("entry_id,collection_id")
    .eq("user_id", userId);
  if (learnedEntries) return learnedEntries;
  return [];
};

export const insertLearnedEntry = async (
  entryId: number,
  collection_id: number,
  userId: string
) => {
  try {
    const { error } = await supabase.from("learned_entries").insert({
      entry_id: entryId,
      collection_id: collection_id,
      user_id: userId,
    });
    if (error) console.error(error.message);
  } catch (error) {
    console.error(`An unexpected error occurred: ${error}`);
  }
};

export const deleteLearnedEntry = async (
  entryId: number,
  collectionId: number
) => {
  try {
    const { error } = await supabase
      .from("learned_entries")
      .delete()
      .eq("entry_id", entryId)
      .eq("collection_id", collectionId);
    if (error) console.error(error.message);
  } catch (error) {
    console.error(`An unexpected error occurred: ${error}`);
  }
};
