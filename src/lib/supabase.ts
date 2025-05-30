import supabase from "../../utils/supabase";

export const getAllDecks = async () => {
  const { data: decks } = await supabase.from("decks").select(`
    id,
    name,
    description,
    cards (id, clue, answer)
  `);
  return decks;
};

export const getAllCategories = async () => {
  const { data: categories } = await supabase.from("categories").select(`
    id,
    slug,
    name
  `);
  return categories;
};

export const getDeckBySlug = async (slug: string) => {
  const { data: decks } = await supabase
    .from("decks")
    .select(
      `
    id,
    slug,
    name,
    description,
    categories (slug),
    cards (id, clue, answer)
  `
    )
    .eq("slug", slug)
    .maybeSingle();
  return decks;
};

export const getDecksByCategorySlug = async (slug: string) => {
  const { data: decks } = await supabase
    .from("categories")
    .select(
      `
    id,
    slug,
    name,
    decks (id, slug, name, description)
  `
    )
    .eq("slug", slug)
    .maybeSingle();
  return decks;
};

export const getRandomCard = async () => {
  const { data: card } = await supabase.from("decks").select(`
      id,
      name,
      description,
      cards (id, clue, answer)
    `);
  return card;
};

export const getDeckLabels = async () => {
  const { data } = await supabase.from("labels").select(`
    id,
    name,
    decks ( id, name, slug, description )
  `);
  return data;
};
