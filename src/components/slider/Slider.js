import { useState, useRef, useEffect } from "react";
import "./slider.css";

function Slider({ percentage = 0, onChange, duration, currentTime }) {
    const [position, setPosition] = useState(0);
    const [marginLeft, setMarginLeft] = useState(0);
    const [progressBarWidth, setProgressBarWidth] = useState(0);

    const rangeRef = useRef();
    const thumbRef = useRef();

    useEffect(() => {
        const rangeWidth = rangeRef.current.getBoundingClientRect().width;
        const thumbWidth = thumbRef.current.getBoundingClientRect().width;
        const centerThumb = (thumbWidth / 100) * percentage * -1;
        const centerProgressBar =
            thumbWidth +
            (rangeWidth / 100) * percentage -
            (thumbWidth / 100) * percentage;
        setPosition(percentage);
        setMarginLeft(centerThumb);
        setProgressBarWidth(centerProgressBar);
    }, [percentage]);

    function secondsToHms(seconds) {
        if (!seconds) return "00m 00s";

        let duration = seconds;
        let hours = duration / 3600;
        duration = duration % 3600;

        let min = parseInt(duration / 60);
        duration = duration % 60;

        let sec = parseInt(duration);

        if (sec < 10) {
            sec = `0${sec}`;
        }
        if (min < 10) {
            min = `0${min}`;
        }

        if (parseInt(hours, 10) > 0) {
            return `${parseInt(hours, 10)}h ${min}m ${sec}s`;
        } else if (min == 0) {
            return `00:${sec}`;
        } else {
            return `${min}:${sec}`;
        }
    }

    return (
        <div className="slider-container">
            <div
                className="progress-bar-cover"
                style={{
                    width: `${progressBarWidth}px`,
                }}
            ></div>
            <div
                className="thumb"
                ref={thumbRef}
                style={{
                    left: `${position}%`,
                    marginLeft: `${marginLeft}px`,
                }}
            ></div>
            <input
                type="range"
                value={position}
                ref={rangeRef}
                step="0.01"
                className="range"
                onChange={onChange}
            />
            <div className="time_div">
                <div className="timer">{secondsToHms(currentTime)}</div>
                <div className="timer">{secondsToHms(duration)}</div>
            </div>
        </div>
    );
}

export default Slider;
