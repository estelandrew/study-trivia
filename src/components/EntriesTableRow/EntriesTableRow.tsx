import EntriesTableAnswer from "@components/EntriesTableAnswer/EntriesTableAnswer";
import { Props } from "./EntriesTableRow.types";

const EntriesTableRow = ({ clue, answer, collectionId }: Props) => {
  return (
    <tr>
      <td>{clue}</td>
      <EntriesTableAnswer answer={answer} collectionId={collectionId} />
      <td>Yes</td>
    </tr>
  );
};

export default EntriesTableRow;
