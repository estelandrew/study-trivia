"use client";

import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Entry } from "@/types/types";
import { Props } from "./EntriesTable.types";
import styles from "./EntriesTable.module.scss";

const columnHelper = createColumnHelper<Entry>();

const columns = [
  columnHelper.accessor("clue", {
    header: () => "Clue",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("answer", {
    header: () => "Answer",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("group", {
    header: () => "Group",
    cell: (info) => info.renderValue(),
  }),
];

const EntriesTable = ({ collectionJoinEntries }: Props) => {
  const [data] = useState<Entry[]>(collectionJoinEntries.entries);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EntriesTable;
