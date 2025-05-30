import { getDeckLabels } from "@/lib/supabase";

export const revalidate = 0;

const Temp = async () => {
  const data = await getDeckLabels();
  console.log(">>> data: ", data);
  return <></>;
};

export default Temp;
