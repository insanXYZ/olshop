import DataTable, { createTheme } from "react-data-table-component";

createTheme("dracula", {
  text: {
    primary: "#FFF",
    secondary: "#FFF",
  },
  background: {
    default: "#303241",
  },
  button: {
    default: "#FFFFFF",
    hover: "rgba(0,0,0,.08)",
    focus: "rgba(255,255,255,.12)",
    disabled: "rgba(255, 255, 255, .34)",
  },
  sortFocus: {
    default: "#2aa198",
  },
});

export default ({ columns, data, ...att }) => {
  return <DataTable columns={columns} data={data} theme="dracula" {...att} />;
};
