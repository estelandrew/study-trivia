import EntriesTableAnswer from "@components/EntriesTableAnswer/EntriesTableAnswer";
import { Props } from "./EntriesTableRow.types";

const EntriesTableRow = ({ clue, answer }: Props) => {
  return (
    <tr>
      <td>{clue}</td>
      <EntriesTableAnswer answer={answer} />
      <td>Yes</td>
    </tr>
  );
};

export default EntriesTableRow;
