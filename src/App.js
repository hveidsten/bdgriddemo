import { useEffect, useState } from "react";
import "./App.css";
import { MaterialReactTable } from "material-react-table";

const App = () => {
  const [transactions, setTransactions] = useState([]);
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
    },
  ];

  return (
    <div className="App">
      <MaterialReactTable columns={columns} data={transactions} />
    </div>
  );
};

export default App;
