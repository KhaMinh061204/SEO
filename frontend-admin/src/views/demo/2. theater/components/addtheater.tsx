import React, { useState } from 'react';
import { Input, Row, Col, List, Button, Modal, Form } from 'antd';
import axios from 'axios';
// ...existing code...

const AddTheater = () => {
    const [brandName, setBrandName] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [img, setImg] = useState('');   
    const [cinemaRooms, setCinemaRooms] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newRoomName, setNewRoomName] = useState('');
    const [newRoomCapacity, setNewRoomCapacity] = useState('');
    const [editRoomIndex, setEditRoomIndex] = useState(null);
    const [isSeatModalVisible, setIsSeatModalVisible] = useState(false);
    const [selectedRoomSeats, setSelectedRoomSeats] = useState([]);

    const handleSubmit = async() => {
        // Handle submit logic here
        console.log('Brand Name:', brandName);
        console.log('Name:', name);
        console.log('Location:', location);
        console.log('Image URL:', img);
        console.log('Cinema Rooms:', cinemaRooms);
            const theaterData = {
                name,
                location,
                brandName,
                img,
            };
            console.log(theaterData); // Kiểm tra dữ liệu trước khi gửi

            try {
                const response = await axios.post('http://localhost:8081/theater/add', theaterData);
                console.log(response)
                if (response.status === 201) {
                    // Thêm thành công
                    console.log('Thêm rạp phim thành công:', response.data);
                    // Reset form hoặc thông báo thành công
                    setBrandName('');
                    setName('');
                    setLocation('');
                    setImg('');
                } else {
                    // Xử lý lỗi từ server
                    console.error('Lỗi khi thêm rạp phim:', response.data.message);
                }
            } catch (error) {
                // Xử lý lỗi kết nối hoặc lỗi khác
                console.error('Lỗi khi gọi API thêm rạp phim:', error);
            }
        
    };

    const handleAddRoom = () => {
        if (editRoomIndex !== null) {
            const updatedRooms = [...cinemaRooms];
            updatedRooms[editRoomIndex] = { name: newRoomName, capacity: newRoomCapacity, seats: selectedRoomSeats };
            setCinemaRooms(updatedRooms);
            setEditRoomIndex(null);
        } else {
            setCinemaRooms([...cinemaRooms, { name: newRoomName, capacity: newRoomCapacity, seats: [] }]);
        }
        setIsModalVisible(false);
        setNewRoomName('');
        setNewRoomCapacity('');
    };

    const handleEditRoom = (index) => {
        setEditRoomIndex(index);
        setNewRoomName(cinemaRooms[index].name);
        setNewRoomCapacity(cinemaRooms[index].capacity);
        setSelectedRoomSeats(cinemaRooms[index].seats || []);
        setIsModalVisible(true);
    };

    const handleDeleteRoom = (index) => {
        setCinemaRooms(cinemaRooms.filter((_, i) => i !== index));
    };

    const handleEditSeats = (index) => {
        setEditRoomIndex(index);
        setSelectedRoomSeats(cinemaRooms[index].seats || []);
        setIsSeatModalVisible(true);
    };

    const handleSaveSeats = () => {
        const updatedRooms = [...cinemaRooms];
        updatedRooms[editRoomIndex].seats = selectedRoomSeats;
        setCinemaRooms(updatedRooms);
        setIsSeatModalVisible(false);
    };

    const renderSeats = (capacity) => {
        const rows = Math.ceil(capacity / 10);
        const seats = [];
        for (let i = 0; i < rows; i++) {
            const rowSeats = [];
            for (let j = 0; j < 10 && i * 10 + j < capacity; j++) {
                rowSeats.push(
                    <span key={i * 10 + j} style={{ display: 'inline-block', width: '20px', height: '20px', border: '1px solid black', margin: '2px' }}>
                        {i * 10 + j + 1}
                    </span>
                );
            }
            seats.push(<div key={i} style={{ marginBottom: '5px' }}>{rowSeats}</div>);
        }
        return seats;
    };

    return (
        <div>
            <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col span={12}>
                    <Input
                        placeholder="Nhập tên thương hiệu"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <Input
                        placeholder="Nhập tên rạp"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <Input
                        placeholder="Nhập địa chỉ rạp"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <Input
                        placeholder="Nhập URL hình ảnh"
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                </Col>
                
            </Row>
            <Row style={{ marginBottom: '16px' }}>
                <Col span={24}>
                    <h3>Phòng chiếu</h3>
                    <List
                        bordered
                        dataSource={cinemaRooms}
                        renderItem={(item, index) => (
                            <List.Item
                                actions={[
                                    <Button type="link" onClick={() => handleEditRoom(index)}>Edit</Button>,
                                    <Button type="link" onClick={() => handleDeleteRoom(index)}>Delete</Button>,
                                    <Button type="link" onClick={() => handleEditSeats(index)}>Edit Seats</Button>
                                ]}
                            >
                                {item.name} - Capacity: {item.capacity}
                            </List.Item>
                        )}
                    />
                    <Button type="dashed" onClick={() => setIsModalVisible(true)} style={{ marginTop: '10px', marginBottom:'10px' }}>
                        Thêm phòng chiếu
                    </Button>
                </Col>

                <Col span={24}>
                    <Button type="primary" onClick={handleSubmit}>
                        Lưu rạp phim
                    </Button>
                </Col>
            </Row>
            <Modal
                title={editRoomIndex !== null ? "Edit Cinema Room" : "Add Cinema Room"}
                visible={isModalVisible}
                onOk={handleAddRoom}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form layout="vertical">
                    <Form.Item label="Room Name">
                        <Input
                            value={newRoomName}
                            onChange={(e) => setNewRoomName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Room Capacity">
                        <Input
                            value={newRoomCapacity}
                            onChange={(e) => setNewRoomCapacity(e.target.value)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Edit Seats"
                visible={isSeatModalVisible}
                onOk={handleSaveSeats}
                onCancel={() => setIsSeatModalVisible(false)}
            >
                <Form layout="vertical">
                    <Form.Item label="Seats">
                        {renderSeats(newRoomCapacity)}
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AddTheater;
