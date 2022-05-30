import "antd/dist/antd.css";
import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";

export interface DataType {
  key: string;
  description: string;
  forkCount: number;
  id: string;
  name: string;
  stargazerCount: number;
  __typename: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Stars",
    dataIndex: "stargazerCount",
    key: "stargazerCount",
  },
  {
    title: "Forks",
    dataIndex: "forkCount",
    key: "forkCount",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];

const TableView = ({ data }: { data: DataType[] }) => {
  const tableData = data.map((e: DataType) => {
    return {
      ...e,
      key: e.id,
    };
  });
  return <div id="testId">
    <Table columns={columns} dataSource={tableData} pagination={false} />
  </div>;
};

export default TableView;
