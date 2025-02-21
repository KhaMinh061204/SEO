import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Ticket from "./ticket";

function OrderHistory() {
    return (
        <section
            className="gap20 flex f-col"
            style={{ transform: "translateY(-100px)", padding: "0 7%" }}
        >
            <div className="flex cenhor cenver w-100 gap20 mb-30 endver">
                {/* Input chọn ngày */}
                <div className="flex f-col gap10" style={{ width: "30%" }}>
                    <input
                        style={{
                            padding: "3% 10%",
                            border: "1px solid transparent",
                            borderRadius: "7px",
                        }}
                        type="date"
                        className="w-100"
                    />
                </div>

                {/* Input tìm kiếm có icon search */}
                <div
                    className="flex f-col gap10 position-relative"
                    style={{ width: "30%", position: "relative" }}
                >
                    <input
                        style={{
                            padding: "3% 3% 3% 10%",
                            border: "1px solid transparent",
                            borderRadius: "30px",
                        }}
                        type="text"
                        placeholder="Search..."
                        className="w-100"
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        style={{
                            position: "absolute",
                            left: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#888",
                        }}
                    />
                </div>
            </div>

            {/* Lịch sử đơn hàng */}
            <div
                className="flex f-col cenhor w-100 mb-30"
                style={{ border: "1px solid white", borderRadius: "5px" }}
            >
                <div
                    className="flex w-100"
                    style={{
                        border: "1px solid white",
                        borderRadius: "5px",
                        fontSize: "14px",
                        color: "white",
                        backgroundColor: "#ffffff3d",
                        padding: "1%",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>11/11/2024</p>
                </div>
                <div className="flex f-col gap20" style={{ padding: "2%" }}>
                    <Ticket />
                    <Ticket />
                    <Ticket />
                </div>
            </div>

            <div
                className="flex f-col cenhor w-100 mb-30"
                style={{ border: "1px solid white", borderRadius: "5px" }}
            >
                <div
                    className="flex w-100"
                    style={{
                        border: "1px solid white",
                        borderRadius: "5px",
                        fontSize: "14px",
                        color: "white",
                        backgroundColor: "#ffffff3d",
                        padding: "1%",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>11/11/2024</p>
                </div>
                <div className="flex f-col gap20" style={{ padding: "2%" }}>
                    <Ticket />
                    <Ticket />
                    <Ticket />
                </div>
            </div>

            <div
                className="flex f-col cenhor w-100 mb-30"
                style={{ border: "1px solid white", borderRadius: "5px" }}
            >
                <div
                    className="flex w-100"
                    style={{
                        border: "1px solid white",
                        borderRadius: "5px",
                        fontSize: "14px",
                        color: "white",
                        backgroundColor: "#ffffff3d",
                        padding: "1%",
                    }}
                >
                    <p style={{ fontSize: "20px" }}>11/11/2024</p>
                </div>
                <div className="flex f-col gap20" style={{ padding: "2%" }}>
                    <Ticket />
                    <Ticket />
                    <Ticket />
                </div>
            </div>
        </section>
    );
}

export default OrderHistory;
