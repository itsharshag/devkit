import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";

import csvtojson from "csvtojson";

import DataGrid, { TextEditor } from "react-data-grid";

import ToolsLayout from "../components/ToolsLayout";
import InputColumnHeader from "../components/InputColumnHeader";
import OutputColumnHeader from "../components/OutputColumnHeader";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), {
  ssr: false,
});

type Comparator = (a, b) => number;
function getComparator(sortColumn: string): Comparator {
  switch (sortColumn) {
    default:
      return (a, b) => {
        return a[sortColumn].localeCompare(b[sortColumn]);
      };
  }
}

export default function Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isInputValid, setIsInputValid] = useState(true);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [sortColumns, setSortColumns] = useState([]);

  const sampleInput =
    '"car","price","color"\n"Audi",40000,"blue"\n"BMW",35000,"black"\n"Porsche",60000,"green"';

  useEffect(() => {
    const calculateOutput = async () => {
      if (!input) {
        setIsInputValid(true);
        return;
      }
      try {
        const output = await csvtojson().fromString(input);
        const header = Object.keys(output[0]);
        const columns = header.map((key) => ({
          key,
          name: key,
          editor: TextEditor,
        }));
        setColumns(columns);
        setRows(output);
        setIsInputValid(true);
      } catch (e) {
        console.log("Invalid CSV", e);
        setIsInputValid(false);
        return;
      }
    };
    calculateOutput();
  }, [input]);

  const sortedRows = useMemo((): readonly any[] => {
    if (sortColumns.length === 0) return rows;

    const sortedRows = [...rows];
    sortedRows.sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === "ASC" ? compResult : -compResult;
        }
      }
      return 0;
    });
    return sortedRows;
  }, [rows, sortColumns]);

  return (
    <div id="tools-page-grid" className="p-8">
      <div id="options" />
      <div className="tool" id="tool" style={{ minHeight: "80vh" }}>
        <div className="io-columns-header">
          <div className="io-column">
            <InputColumnHeader sampleInput={sampleInput} setInput={setInput} />
            <CodeEditor
              language="javascript"
              value={input}
              onChange={(e) => setInput(e)}
              name="body"
            />
          </div>
          <div className="io-column">
            <OutputColumnHeader extension="" />
            <DataGrid
              columns={columns}
              rows={sortedRows}
              defaultColumnOptions={{
                // sortable: true,
                resizable: true,
              }}
              onRowsChange={setRows}
              sortColumns={sortColumns}
              onSortColumnsChange={setSortColumns}
              style={{ height: "100%", background: "black", border: "0" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Tool.getLayout = function getLayout(page) {
  return <ToolsLayout>{page}</ToolsLayout>;
};
