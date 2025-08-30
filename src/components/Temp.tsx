import { getCollectionsByCategorySlug } from "@/lib/api";

export const revalidate = 0;

const Temp = async () => {
  const data = await getCollectionsByCategorySlug("geography");
  console.log(">>> data: ", data);
  return <></>;
};

export default Temp;
