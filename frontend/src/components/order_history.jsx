import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Ticket from "./ticket";

function OrderHistory() {
    return (
        <section
            className="gap20 flex f-col"
            style={{ 
                transform: "translateY(-100px)", 
                padding: "0 5%",
                maxWidth: "1200px",
                margin: "0 auto",
                width: "100%" 
            }}
        >
            <div className="flex cenhor cenver w-100 gap20 mb-30 endver flex-wrap">
                {/* Input chọn ngày */}
                <div className="flex f-col gap10" style={{ 
                    width: "30%", 
                    minWidth: "250px",
                    marginBottom: "10px"
                }}>
                    <input
                        style={{
                            padding: "0.8rem 1rem",
                            border: "1px solid transparent",
                            borderRadius: "7px",
                            width: "100%",
                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            fontSize: "1rem"
                        }}
                        type="date"
                        className="w-100"
                        aria-label="Chọn ngày"
                    />
                </div>

                {/* Input tìm kiếm có icon search */}
                <div
                    className="flex f-col gap10 position-relative"
                    style={{ 
                        width: "30%", 
                        minWidth: "250px",
                        position: "relative",
                        marginBottom: "10px"
                    }}
                >
                    <input
                        style={{
                            padding: "0.8rem 0.8rem 0.8rem 2.5rem",
                            border: "1px solid transparent",
                            borderRadius: "30px",
                            width: "100%",
                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            fontSize: "1rem"
                        }}
                        type="text"
                        placeholder="Tìm kiếm đơn hàng..."
                        className="w-100"
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        style={{
                            position: "absolute",
                            left: "15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "#888",
                        }}
                    />
                </div>
            </div>

            {/* Lịch sử đơn hàng */}
            {[1, 2, 3].map((index) => (
                <div
                    key={index}
                    className="flex f-col cenhor w-100 mb-30"
                    style={{ border: "1px solid white", borderRadius: "5px" }}
                >
                    <div
                        className="flex w-100"
                        style={{
                            border: "1px solid white",
                            borderRadius: "5px",
                            color: "white",
                            backgroundColor: "#ffffff3d",
                            padding: "0.5rem 1rem",
                        }}
                    >
                        <p style={{ 
                            fontSize: "clamp(16px, 4vw, 20px)", 
                            fontWeight: "600", 
                            margin: "0.2rem 0",
                            letterSpacing: "0.5px",
                            textShadow: "0px 1px 1px rgba(0,0,0,0.2)"
                        }}>11 tháng 11, 2024</p>
                    </div>
                    <div className="flex f-col gap20" style={{ padding: "1rem" }}>
                        <Ticket />
                        <Ticket />
                        <Ticket />
                    </div>
                </div>
            ))}

            {/* Responsive styles */}
            <style jsx>{`
                @media (max-width: 768px) {
                    section {
                        transform: translateY(-50px) !important;
                        padding: 0 3% !important;
                    }
                    
                    .flex-wrap {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    
                    .flex-wrap > div {
                        width: 100% !important;
                    }
                }
                
                @media (max-width: 480px) {
                    section {
                        transform: translateY(-30px) !important;
                    }
                    
                    input::placeholder {
                        font-size: 0.9rem;
                    }
                    
                    input[type="date"] {
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </section>
    );
}

export default OrderHistory;
