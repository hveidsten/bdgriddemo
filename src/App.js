import { useEffect, useState } from "react";
import "./App.css";
import { MaterialReactTable } from "material-react-table";
import { Autocomplete, TextField } from "@mui/material";
import _ from "lodash";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetch(
        "https://634fa960df22c2af7b5660db.mockapi.io/transactions"
      );
      const transactions = await data.json();
      setTransactions(transactions);
    };
    getTransactions();
  }, []);

  useEffect(() => {
    const uniqueCurrencies = _.uniqBy(transactions, "currency").map(
      (obj) => obj.currency
    );
    setCurrencies(uniqueCurrencies);
  }, [transactions]);

  const handleSaveCell = (cell, value) => {
    console.log(cell, value);
    transactions[cell.row.index][cell.column.id] = value;
    setTransactions([...transactions]);
  };

  const columns = [
    {
      accessorKey: "voucherNo",
      header: "Voucher No",
    },
    {
      accessorKey: "accountNo",
      header: "Account",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "currency",
      header: "Currency",
      Edit: ({ cell, column, table }) => (
        <Autocomplete
          options={currencies}
          value={cell.value}
          renderInput={(params) => <TextField size="small" {...params} />}
          onChange={(event, value) => handleSaveCell(cell, value)}
        />
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "invoiceDueDate",
      header: "Due Date",
    },
    {
      accessorKey: "id",
      header: "ID",
    },
  ];

  return (
    <div className="App">
      <MaterialReactTable
        editingMode="cell"
        enableEditing
        muiTableBodyCellEditTextFieldProps={({ cell }) => ({
          onBlur: (event) => {
            handleSaveCell(cell, event.target.value);
          },
        })}
        columns={columns}
        data={transactions}
      />
    </div>
  );
};

export default App;
