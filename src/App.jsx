import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { Table } from "antd";
import { Input } from "antd";
const { Search } = Input;

function App() {
  const [result, setResult] = useState([]); //useState to set user data

  //....................Table columns.....................
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  // fetching data from json file with the help of json server
  const fetchData = () => {
    try {
      axios.get("http://localhost:8080/users").then((res) => {
        setResult(res?.data);
      });
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  // updating state for name

  const searchName = (name) => {
    let filterData = result.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    setResult(filterData);
  };

  // console.log("result:", result);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Search Boxed</h1>
        <div className="search">
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={(e) => searchName(e)}
          />
        </div>
        <Table columns={columns} dataSource={result} onChange={onChange} />;
      </div>
    </div>
  );
}

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default App;
