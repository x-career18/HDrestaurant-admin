import { Image } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ComingSoon.scss'

const ComingSoon = () => {
    const navigate = useNavigate();
    return (
        <div className="main coming-soon-page">
            <div className="container">
                <div className="launching-soon">
                    <div className="launch-message">Tính năng đang hoàn thiện</div>
                    <div className="contact-us">
                        Vui lòng liên hệ với chúng tôi để được hỗ trợ
                    </div>
                </div>
                <div className="phone-comp common-margin">
                    <Image
                        src="src/assets/icons/restaurant.svg"
                        alt="phone"
                        width={28}
                        height={28}
                    />
                    <div className="phone-number">+84 123 456 789</div>
                </div>
                <button
                    className="home-button"
                    onClick={() => navigate("/")}
                >Trang chủ</button>
            </div>
        </div>
    )
}

export default ComingSoon