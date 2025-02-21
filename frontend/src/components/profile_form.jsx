import { useEffect, useState } from "react";
import { get, put } from "../api/api";

function ProfileForm() {

    const [profile, setProfile] = useState({
        name: "",
        dateOfBirth: "",
        phone: "",
        email: "",
        gender: "",
    });

    // Fetch dữ liệu từ API khi component render
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const data = await get("/account/profile");

                const formattedDob =
                    data.dateOfBirth && !isNaN(new Date(data.dateOfBirth).getTime())
                        ? new Date(data.dateOfBirth).toISOString().split("T")[0]
                        : "";

                setProfile({
                    name: data.name || "",
                    dateOfBirth: formattedDob || "",
                    phone: data.phone || "",
                    email: data.email || "",
                    gender: data.gender || "",
                });

            } catch (error) {
                console.error("Lỗi khi fetch profile:", error);
            }
        };

        fetchProfileData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProfile = {
                name: profile.name,
                phone: profile.phone,
                dateOfBirth: profile.dateOfBirth,
                email: profile.email,
                gender: profile.gender,
            };

            const response = await put("/account/update-profile", updatedProfile);
            alert(response.message || "Cập nhật thành công!"); // Hiển thị thông báo thành công
        } catch (error) {
            console.error("Lỗi khi cập nhật profile:", error);
            alert("Cập nhật thất bại!");
        }
    };


    // Hàm xử lý khi người dùng thay đổi thông tin
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <section style={{ transform: "translateY(-100px)", padding: "0 7%" }}>
            <div className="flex cenhor cenver w-100 gap20 mb-30">
                <div className="flex f-col w-100 gap10">
                    <label style={{ color: "white" }}>Họ và tên</label>
                    <input
                        style={{
                            padding: "2%",
                            border: "1px solid transparent",
                            borderRadius: "7px",
                        }}
                        placeholder="Họ tên"
                        className="w-100"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex f-col w-100 gap10">
                    <label style={{ color: "white" }}>Ngày sinh</label>
                    <input
                        style={{
                            padding: "2%",
                            border: "1px solid transparent",
                            borderRadius: "7px",
                        }}
                        type="date"
                        className="w-100"
                        name="dateOfBirth"
                        value={profile.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="flex cenhor cenver w-100 gap20 mb-30">
                <div className="flex f-col w-100 gap10">
                    <label style={{ color: "white" }}>Số điện thoại</label>
                    <input
                        style={{
                            padding: "2%",
                            border: "1px solid transparent",
                            borderRadius: "7px",
                        }}
                        placeholder="Số điện thoại"
                        className="w-100"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex f-col w-100 gap10">
                    <label style={{ color: "white" }}>Email</label>
                    <input
                        style={{
                            padding: "2%",
                            border: "1px solid transparent",
                            borderRadius: "7px",
                        }}
                        placeholder="Email"
                        className="w-100"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="flex cenhor cenver w-100 gap20 mb-30">
                <div className="flex f-col w-100 gap10">
                    <label style={{ color: "white" }}>Giới tính</label>
                    <div className="flex w-100 gap20">
                        <div className="flex gap10">
                            <input
                                type="radio"
                                name="gender"
                                value="Name"
                                checked={profile.gender === "Name"}
                                onChange={handleChange}
                            />
                            <label style={{ color: "white" }}>Nam</label>
                        </div>
                        <div className="flex gap10">
                            <input
                                type="radio"
                                name="gender"
                                value="Nữ"
                                checked={profile.gender === "Nữ"}
                                onChange={handleChange}
                            />
                            <label style={{ color: "white" }}>Nữ</label>
                        </div>
                    </div>
                </div>
                {/* <div className="flex f-col w-100 gap10">
                    <label style={{ color: "white" }}>Mật khẩu</label>
                    <input
                        style={{
                            padding: "2%",
                            border: "1px solid transparent",
                            borderRadius: "7px",
                        }}
                        type="password"
                        className="w-100"
                    />
                </div> */}
            </div>
            <div className="flex cenhor cenver w-100 gap20 mt-50">
                <button onClick={handleSubmit} className="btn_cus" id="more_films">
                    <p className="text_upper">Cập nhật</p>
                </button>
            </div>
        </section>
    );
}

export default ProfileForm;
