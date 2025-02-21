import { Space, Table, Modal, Form, Input, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";

const { confirm } = Modal;

interface DataType {
  key: string;
  title: string;
  description: string;
  duration: number;
  genre: string;
  rating: number;
  limit_age: string;
  poster_url: string;
}

const DemoTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFilm, setEditingFilm] = useState<DataType | null>(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8081/movie/all');
      const movies = response.data.movies || response.data;

      if (!Array.isArray(movies)) {
        throw new Error("API response is not an array");
      }

      const transformedData = movies.map((movie: any) => ({
        key: movie._id,
        title: movie.title,
        description: movie.description,
        duration: movie.duration,
        genre: movie.genre,
        rating: movie.rating,
        limit_age: movie.limit_age,
        poster_url: movie.poster_url,
      }));

      setData(transformedData);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8081/movie/${id}`);
      setData(data.filter((film) => film.key !== id));
      message.success("Xóa phim thành công!");
    } catch (error) {
      console.error("Failed to delete movie:", error);
      message.error("Failed to delete movie. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (id: string, title: string) => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa phim "${title}"?`,
      content: "Hành động này không thể phục hồi",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log("Cancelled delete");
      },
    });
  };

  const showEditModal = (film: DataType) => {
    setEditingFilm(film);
    setIsModalVisible(true);
  };

  const handleEdit =async (values: DataType) => {
    console.log("Editing film:", values);
      if (!editingFilm) return;
    
      try {
        setLoading(true);
        const response = await axios.put(`http://localhost:8081/movie/${editingFilm.key}`, values);
        message.success("Phim đã được cập nhật thành công!");
    
        const updatedData = data.map((film) =>
          film.key === editingFilm.key ? { ...film, ...values } : film
        );
        setData(updatedData);
      } catch (error) {
        console.error("Failed to update movie:", error);
        message.error("Cập nhật phim thất bại, vui lòng thử lại.");
      } finally {
        setLoading(false);
        setIsModalVisible(false);
        setEditingFilm(null);
      }
    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Limit Age",
      dataIndex: "limit_age",
      key: "limit_age",
    },
    {
      title: "Poster",
      dataIndex: "poster_url",
      key: "poster_url",
      render: (url: string) => <img src={url} alt="poster" style={{ width: "50px" }} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <a onClick={() => showEditModal(record)}>Edit</a>
          <a
            onClick={() => showDeleteConfirm(record.key, record.title)}
            style={{ color: "red" }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} loading={loading} />

      <Modal
        title="Edit Film"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {editingFilm && (
          <Form initialValues={editingFilm} onFinish={handleEdit}>
            <Form.Item name="title" label="Title">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input />
            </Form.Item>
            <Form.Item name="duration" label="Duration">
              <Input />
            </Form.Item>
            <Form.Item name="genre" label="Genre">
              <Input />
            </Form.Item>
            <Form.Item name="rating" label="Rating">
              <Input />
            </Form.Item>
            <Form.Item name="limit_age" label="Limit Age">
              <Input />
            </Form.Item>
            <Form.Item name="poster_url" label="Poster URL">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default DemoTable;
