import React, { useEffect, useState } from "react";
import axios from "axios";
import type { TableProps } from "antd";
import { Space, Table, Modal, Input, message } from "antd";

interface DataType {
  key: string;
  brandName: string;
  name: string;
  location: string;
  img: string;
}

const DemoTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]); // State để lưu dữ liệu từ API
  const [loading, setLoading] = useState<boolean>(false); // State loading

  // Hàm fetch danh sách rạp chiếu phim từ API
  const fetchTheaters = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8081/theater/all");
      const transformedData = response.data.map((theater: any) => ({
        key: theater._id, // key từ backend (MongoDB ID)
        brandName:theater.brand_id.name,
        name: theater.name,
        location: theater.location,
        img:theater.img
      }));
      setData(transformedData); // Cập nhật state với dữ liệu đã chuyển đổi
    } catch (error) {
      console.error("Failed to fetch theaters:", error);
      message.error("Failed to fetch theaters. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Hàm xóa rạp chiếu phim
  const handleDelete = (key: string) => {
    Modal.confirm({
      title: "Chắc chắn xóa",
      content: "Hành động này sẽ xóa phim ngay lập tức.",
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8081/theater/${key}`);
          message.success("Theater deleted successfully");
          fetchTheaters(); // Cập nhật danh sách sau khi xóa
        } catch (error) {
          console.error("Failed to delete theater:", error);
          message.error("Failed to delete theater. Please try again.");
        }
      },
    });
  };
  
  // Hàm chỉnh sửa thông tin rạp chiếu phim
  const handleEdit = (key: string) => {
    const theater = data.find((item) => item.key === key);
    if (!theater) return;

  let name = theater.name;
  let location = theater.location;
  let brandName = theater.brandName;
  let img = theater.img;

  Modal.confirm({
    title: 'Edit Theater',
    content: (
      <div>
        <Input 
          defaultValue={brandName} 
          onChange={(e) => brandName = e.target.value} 
          placeholder="Brand Name" 
        />
        <Input 
          defaultValue={name} 
          onChange={(e) => name = e.target.value} 
          placeholder="Name" 
          style={{ marginTop: 10 }} 
        />
        <Input 
          defaultValue={location} 
          onChange={(e) => location = e.target.value} 
          placeholder="Location" 
          style={{ marginTop: 10 }} 
        />
        <Input 
          defaultValue={img} 
          onChange={(e) => img = e.target.value} 
          placeholder="Image URL" 
          style={{ marginTop: 10 }} 
        />
      </div>
    ),
    onOk: async () => {
      try {
        const response = await axios.put(`http://localhost:8081/theater/${key}`, {
          name,
          location,
          brandName,
          img,
        });
        message.success('Theater updated successfully');
        fetchTheaters(); // Cập nhật danh sách rạp
      } catch (error) {
        console.error("Failed to update theater:", error);
        message.error("Failed to update theater. Please try again.");
      }
    },
  });
};

  // Gọi API khi component mount
  useEffect(() => {
    fetchTheaters();
  }, []);

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Brand Name",
    dataIndex: "brandName",
    key: "brandName",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Theater Image Link",
    dataIndex: "img",
    key: "img",
    render: (text) => (
      <a href={text} target="_blank" rel="noopener noreferrer">
        {text.length > 30 ? `${text.slice(0, 30)}...` : text}
      </a>
    ), // Chỉ hiển thị 30 ký tự đầu và cho phép mở URL
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => handleEdit(record.key)} style={{ color: 'blue' }}>Edit</a>
        <a onClick={() => handleDelete(record.key)} style={{ color: 'red' }}>Delete</a>
      </Space>
    ),
  },
];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default DemoTable;
