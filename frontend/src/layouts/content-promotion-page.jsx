import { SearchOutlined } from '@ant-design/icons';
import { Card, Col, Input, Row, Select, DatePicker } from 'antd';
import React, { useState } from 'react';
import "../stylesheets/layouts/promotion-page.css";

const { Option } = Select;

const removeDiacritics = (str) => {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
};

const ContentPromotionPage = () => {
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    const promotions = [
        {
            id: 1,
            title: 'Giảm 50% vé xem phim',
            image: 'https://homepage.momocdn.net/blogscontents/momo-upload-api-200529162940-637263665800395015.jpg',
            expiry: '2023-12-19'
        },
        {
            id: 1,
            title: 'Giảm 30% vé xem phim',
            image: 'https://homepage.momocdn.net/blogscontents/momo-upload-api-200529162940-637263665800395015.jpg',
            expiry: '2023-12-22'
        },
        {
            id: 1,
            title: 'Giảm 20% vé xem phim',
            image: 'https://homepage.momocdn.net/blogscontents/momo-upload-api-200529162940-637263665800395015.jpg',
            expiry: '2023-12-1'
        },
        {
            id: 1,
            title: 'Giảm 100% vé xem phim',
            image: 'https://homepage.momocdn.net/blogscontents/momo-upload-api-200529162940-637263665800395015.jpg',
            expiry: '2023-12-5'
        },
        {
            id: 1,
            title: 'Giảm năm mươi vé xem phim',
            image: 'https://homepage.momocdn.net/blogscontents/momo-upload-api-200529162940-637263665800395015.jpg',
            expiry: '2023-11-1'
        },
        // ...more promotions
    ];

    const filterPromotions = () => {
        return promotions
            .filter(promo => {
                const normalizedTitle = removeDiacritics(promo.title.toLowerCase());
                const normalizedSearch = removeDiacritics(searchText.toLowerCase());
                const matchesNormalized = normalizedTitle.includes(normalizedSearch);
                const matchesOriginal = promo.title.toLowerCase().includes(searchText.toLowerCase());

                return matchesNormalized || matchesOriginal;
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case 'newest':
                        return new Date(b.expiry) - new Date(a.expiry);
                    case 'oldest':
                        return new Date(a.expiry) - new Date(b.expiry);
                    case 'title':
                        return a.title.localeCompare(b.title);
                    default:
                        return 0;
                }
            });
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };



    const handleSort = (value) => {
        setSortBy(value);
    };

    const filteredPromotions = filterPromotions();

    return (
        <div className="promotion-page">
            <div className="promotion-banner" style={{
                background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/images/promotion-banner.jpg")',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                marginBottom: '2rem'
            }}>
                <h1>Ưu đãi đặc biệt</h1>
            </div>

            <div className="promotion-filters" style={{ marginBottom: '2rem' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={6}>
                        <Input
                            placeholder="Tìm kiếm ưu đãi"
                            prefix={<SearchOutlined />}
                            onChange={handleSearch}
                            value={searchText}
                        />
                    </Col>
                    <Col xs={24} md={6}>
                        <Select
                            defaultValue="newest"
                            style={{ width: '100%' }}
                            onChange={handleSort}
                        >
                            <Option value="newest">Mới nhất</Option>
                            <Option value="oldest">Cũ nhất</Option>
                            <Option value="title">Theo tên A-Z</Option>
                        </Select>
                    </Col>
                </Row>
            </div>

            <div className="promotion-list">
                <Row gutter={[16, 16]}>
                    {filteredPromotions.map(promo => (
                        <Col xs={24} sm={12} md={8} key={promo.id}>
                            <Card
                                hoverable
                                cover={<img alt={promo.title} src={promo.image} />}
                                className="promotion-card"
                            >
                                <Card.Meta
                                    title={promo.title}
                                />
                                <div className="promo-expiry" style={{ marginTop: '1rem' }}>
                                    Hết hạn: {promo.expiry}
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default ContentPromotionPage;
