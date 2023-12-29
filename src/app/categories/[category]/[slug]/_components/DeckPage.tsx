import PageHeader from "@components/PageHeader/PageHeader";
import styles from "./DeckPage.module.scss";
import { DeckDataType } from "@root/types";
import DeckViewWrapper from "@components/DeckViewWrapper/DeckViewWrapper";

type PropsType = {
  data: DeckDataType;
};

const DeckPage = ({ data }: PropsType) => {
  const { slug, name, description, cards } = data || {};
  return (
    <>
      <PageHeader categorySlug={slug} text={name} description={description} />
      <div className={styles.row}>{cards?.length} Rows</div>
      <DeckViewWrapper data={data} />
    </>
  );
};

export default DeckPage;
