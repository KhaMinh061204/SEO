/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import $ from 'jquery'
import logo from '../assets/img/logo.png'
import DropDownMenu from '../components/drop-down-menu'
import SearchBar from './SearchBar'
import { get } from '../api/api'

function navbar() {
    const navigate = useNavigate()

    useEffect(() => { }, [location])
    const locat = useLocation();
    const token = localStorage.getItem('token')
    const expires = sessionStorage.getItem('expires')
    const [user, setUser] = useState({ avatar: '' });

    const nav_config = () => {
        if (locat.pathname === "/") {
            $("#home").addClass("nav_link_active");
            return;
        }
        const path = locat.pathname.split("/")[1];
        $("#" + path).addClass("nav_link_active");
    }

    const handleSearch = searchTerm => {
        // Chuyển hướng đến trang tìm kiếm với từ khóa tìm kiếm trong URL
        if (searchTerm) {
            navigate(`/search?title=${searchTerm}`)
        }
    }

    // useEffect(() => {
    //     if (token && expires) {
    //         const currentTime = Date.now()
    //         if (currentTime < expires) {
    //             $('#login').addClass('hide')
    //             $('#img_account_top').removeClass('hide')
    //         } else {
    //             localStorage.removeItem('token')
    //             sessionStorage.removeItem('token')
    //             sessionStorage.removeItem('expires')
    //             $('#login').removeClass('hide')
    //             $('#img_account_top').addClass('hide')
    //         }
    //     } else {
    //         $('#login').removeClass('hide')
    //         $('#img_account_top').addClass('hide')
    //     }
    //     nav_config();

    // }, [token, expires, locat.pathname])
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Chỉ gọi API nếu token tồn tại và hợp lệ
                if (token && expires) {
                    const currentTime = Date.now();
                    if (currentTime < expires) {
                        const profileData = await get('/account/profile');
                        setUser({
                            avatar: profileData.avatar, // Lấy avatar từ API
                        });
                        $('#login').addClass('hide');
                        $('#img_account_top').removeClass('hide');
                    } else {
                        // Token đã hết hạn
                        localStorage.removeItem('token');
                        sessionStorage.removeItem('token');
                        sessionStorage.removeItem('expires');
                        $('#login').removeClass('hide');
                        $('#img_account_top').addClass('hide');
                    }
                } else {
                    // Không có token
                    $('#login').removeClass('hide');
                    $('#img_account_top').addClass('hide');
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin hồ sơ:', error);
                $('#login').removeClass('hide');
                $('#img_account_top').addClass('hide');
            }
        };

        fetchProfile();
        nav_config();
    }, [token, expires, locat.pathname]);

    return (
        <>
            {/* nav side */}

            <header>
                <div className='wrap_header_nav'>
                    <div className='wrap_right_nav'>
                        <div
                            onClick={() => {
                                navigate('/')
                                window.location.reload()
                            }}
                        >
                            <img id='logo-trans' src={logo} width={150} />
                        </div>
                    </div>

                    <div className='wrap_center_ul'>
                        <ul className='center_ul' id='nav-center'>
                            <li
                                className='nav_link nav_header'
                                id='home'
                                onClick={() => {
                                    navigate('/')
                                }}
                            >
                                Trang chủ
                            </li>
                            <li
                                className='nav_link nav_header'
                                id='filmlist'
                                onClick={() => {
                                    navigate('/filmlist')
                                }}
                            >
                                Phim
                            </li>
                            <li
                                className='nav_link nav_header'
                                id='cinemalist'
                                onClick={() => {
                                    navigate('/cinemalist')
                                }}
                            >
                                Rạp chiếu
                            </li>
                            <li
                                className='nav_link nav_header'
                                id='promotion'
                                onClick={() => {
                                    navigate('/promotion')
                                }}
                            >
                                Khuyến mãi
                            </li>
                        </ul>
                    </div>

                    <div className='wrap_auth_btn' id='auth_btn'>
                        <SearchBar onSearch={handleSearch} />
                        <button
                            onClick={() => {
                                $('#authpopup').removeClass('hide')
                            }}
                            className='btn nav_header'
                            id='login'
                        >
                            <p>Đăng nhập</p>
                        </button>
                        <div
                            id='img_account_top'
                            className='wrap_img_account_top hide'
                            style={{ position: 'relative' }}
                        >
                            {/* onClick={()=>{navigate("/profile/info")}} */}
                            <img
                                src={user.avatar}
                                alt='User Avatar'
                                className='userimg-prod'
                                style={{ width: '35px', height: '35px', marginRight: '5px' }}
                            />
                            <DropDownMenu />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default navbar
