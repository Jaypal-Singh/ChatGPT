import React, { useEffect, useState } from 'react';
import './PopupBox.css';

const PopupBox = ({ message, type = 'info', onClose, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                onClose();
            }, 500); // Wait for animation to finish
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!message) return null;

    return (
        <div className={`popup-overlay ${!isVisible ? 'popup-exit' : ''}`}>
            <div className={`popup-box ${type}`}>
                <div className="popup-message">{message}</div>
            </div>
        </div>
    );
};

export default PopupBox;
