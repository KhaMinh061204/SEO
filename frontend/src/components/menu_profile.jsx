import { useLocation, useNavigate } from "react-router";
import { useEffect, useState, useCallback } from "react";
import { get, postWithFile } from "../api/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faSpinner } from '@fortawesome/free-solid-svg-icons';

const MENU_ITEMS = [
    { name: 'info', label: 'Thông tin cá nhân' },
    { name: 'history', label: 'Lịch sử giao dịch' },
    { name: 'myorder', label: 'Vé của tôi' },
    { name: 'notify', label: 'Thông báo' }
];

const styles = {
    menuItem: {
        fontSize: "18px",
        color: "white"
    },
    avatarUploadButton: {
        position: "absolute",
        bottom: "10px",
        right: "20px",
        background: "white",
        borderRadius: "50%",
        padding: "10px",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    }
};

function MenuProfile() {
    const [user, setUser] = useState({ name: "", avatar: "" });
    const [isUploading, setIsUploading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const fetchProfile = useCallback(async () => {
        try {
            const profileData = await get("/account/profile");
            setUser({
                name: profileData.name,
                avatar: profileData.avatar,
            });
        } catch (error) {
            console.error("Lỗi khi lấy thông tin hồ sơ:", error);
        }
    }, []);

    const handleMenuClick = useCallback((name) => {
        navigate(`/profile/${name}`);
    }, [navigate]);

    const handleAvatarUpload = async (file) => {
        if (!file || isUploading) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const response = await postWithFile("/account/update-avatar", formData);
            setUser(prev => ({ ...prev, avatar: response.avatar }));
        } catch (error) {
            console.error("Lỗi khi cập nhật avatar:", error);
            alert("Cập nhật avatar thất bại!");
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
        const currentPath = location.pathname.split("/")[2];
        document.querySelector(`.menu_profile[data-name='${currentPath}']`)?.classList.add("menu_profile_active");
    }, [fetchProfile, location.pathname]);

    return (
        <section>
            <div className="w-100" style={{ height: "40dvh" }}>
                <img
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                    src="https://images.lomediehus.se/app/uploads/sites/7/2024/01/25094554/salongsbild1.jpg?auto=format&crop=faces&facepad=10&fit=crop&q=50&w=1600"
                    alt="Background"
                />
            </div>
            <div className="flex f-col" style={{ transform: "translateY(-120px)", position: "relative", padding: "0 5%" }}>
                <div className="flex cenhor gap20">
                    <div style={{ position: 'relative' }}>
                        <img
                            width="200"
                            height="200"
                            style={{ 
                                objectFit: "cover", 
                                borderRadius: "50%",
                                opacity: isUploading ? 0.7 : 1,
                                transition: 'opacity 0.3s'
                            }}
                            src={user.avatar}
                            alt="User Avatar"
                        />
                        <label 
                            htmlFor="upload-avatar" 
                            style={{
                                ...styles.avatarUploadButton,
                                cursor: isUploading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <FontAwesomeIcon 
                                icon={isUploading ? faSpinner : faCamera} 
                                style={{ 
                                    fontSize: "18px",
                                    animation: isUploading ? 'spin 1s linear infinite' : 'none'
                                }} 
                            />
                        </label>
                        <input
                            type="file"
                            id="upload-avatar"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleAvatarUpload(e.target.files[0])}
                            disabled={isUploading}
                        />
                        {isUploading && (
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: '#fff',
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                padding: '10px',
                                borderRadius: '5px'
                            }}>
                                Đang tải...
                            </div>
                        )}
                    </div>

                    <h1 className="p-0 product-name mb-5 m-0" style={{ fontSize: "30px" }}>
                        {user.name}
                    </h1>
                </div>

                <div className="w-100 flex f-col cenhor" style={{ padding: "3% 2%" }}>
                    <div className="flex spa-bet-ver w-100 mb-10">
                        {MENU_ITEMS.map(item => (
                            <p
                                key={item.name}
                                data-name={item.name}
                                className="menu_profile"
                                style={styles.menuItem}
                                onClick={() => handleMenuClick(item.name)}
                            >
                                {item.label}
                            </p>
                        ))}
                    </div>
                    <div className="line w-100 mt-10" style={{ height: "2px", backgroundColor: "white" }}></div>
                </div>
            </div>
        </section>
    );
}

export default MenuProfile;
