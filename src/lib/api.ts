import supabase from "@utils/supabase";

export const getCollections = async () => {
  try {
    const { data, error } = await supabase.from("collections").select(`
    id,
    name,
    description,
    entries (id, clue, answer)
  `);
    if (error) console.error(error.message);
    return data;
  } catch (error) {
    console.error(`An unexpected error occurred: ${error}`);
    return null;
  }
};

export const getCategories = async () => {
  try {
    const { data, error } = await supabase.from("categories").select(`
    id,
    slug,
    name
  `);
    if (error) console.error(error.message);
    return data;
  } catch (error) {
    console.error(`An unexpected error occurred: ${error}`);
    return null;
  }
};

export const getCollectionBySlug = async (slug: string) => {
  try {
    const { data, error } = await supabase
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
    if (error) console.error(error.message);
    return data;
  } catch (error) {
    console.error(`An unexpected error occurred: ${error}`);
    return null;
  }
};

export const getCollectionsByCategorySlug = async (slug: string) => {
  try {
    const { data, error } = await supabase
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
    if (error) console.error(error.message);
    return data;
  } catch (error) {
    console.error(`An unexpected error occurred: ${error}`);
    return null;
  }
};

export const getLearnedEntries = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("learned_entries")
      .select("entry_id,collection_id")
      .eq("user_id", userId);
    if (error) console.error(error.message);
    return data;
  } catch (error) {
    console.error(`An unexpected error occurred: ${error}`);
    return null;
  }
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
    return null;
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
    return null;
  }
};
