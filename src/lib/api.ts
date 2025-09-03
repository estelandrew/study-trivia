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
    entries (id, clue, answer)
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

// export const getCollectionsLabels = async () => {
//   const { data } = await supabase.from("labels").select(`
//     id,
//     name,
//     decks ( id, name, slug, description )
//   `);
//   return data;
// };
