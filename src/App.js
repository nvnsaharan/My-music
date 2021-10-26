import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import musiclist from "./music";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import ShareIcon from "@mui/icons-material/Share";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import EqualizerIcon from "@mui/icons-material/Equalizer";

import Button from "@mui/material/Button";
import Slider from "./components/slider/Slider";

import song1 from "./music/Suncrown - Legend of the Forgotten Centuries.mp3";
import song2 from "./music/song2.mpeg";
import song3 from "./music/song3.mp4";

function App() {
    const songarray = [song1, song2, song3];
    const [number, setNumber] = useState(0);
    const [music, setMusic] = useState("");
    const [like, setLike] = useState(false);
    const [suffle, setSuffle] = useState(false);
    const [song, setSong] = useState(song1);

    const [percentage, setPercentage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isadded, setIsadded] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioRef = useRef();

    const onChange = (e) => {
        const audio = audioRef.current;
        audio.currentTime = (audio.duration / 100) * e.target.value;
        setPercentage(e.target.value);
    };

    const play = () => {
        const audio = audioRef.current;
        audio.volume = 0.1;

        if (!isPlaying) {
            setIsPlaying(true);
            audio.play();
        }

        if (isPlaying) {
            setIsPlaying(false);
            audio.pause();
        }
    };

    const getCurrDuration = (e) => {
        const percent = (
            (e.currentTarget.currentTime / e.currentTarget.duration) *
            100
        ).toFixed(2);
        const time = e.currentTarget.currentTime;

        setPercentage(+percent);
        setCurrentTime(time.toFixed(2));
    };

    useEffect(() => {
        setMusic(musiclist[number % musiclist.length]);
        setSong(songarray[number % songarray.length]);
        setPercentage(0);
        setIsPlaying(!isPlaying);
        setTimeout(() => {
            play();
        }, 500);
    }, [number]);
    return (
        <div className="App">
            <div className="music_player">
                <div className="top_div ">
                    <div className="music_image_div">
                        <img
                            alt="music image"
                            className="music_image"
                            src={music.image}
                        ></img>
                    </div>
                    <div className="music_details">
                        <div className="music_status">Now Playing</div>
                        <div className="music_detail">
                            <p className="music_name">{music.Name}</p>
                            <p className="music_singer">{music.Singer}</p>
                            <p className="music_album">{music.album}</p>
                        </div>
                        <div className="music_buttons">
                            <Button className="icon_buttons">
                                {like ? (
                                    <FavoriteIcon
                                        onClick={() => setLike(!like)}
                                        className="main_button icons icon_border"
                                    />
                                ) : (
                                    <FavoriteBorderIcon
                                        onClick={() => setLike(!like)}
                                        className="icons icon_border"
                                    />
                                )}
                            </Button>
                            <Button className="icon_buttons">
                                {isadded ? (
                                    <PlaylistAddCheckIcon
                                        onClick={() => setIsadded(!isadded)}
                                        className="main_button icons icon_border"
                                    />
                                ) : (
                                    <PlaylistAddIcon
                                        onClick={() => setIsadded(!isadded)}
                                        className="icons icon_border"
                                    />
                                )}
                            </Button>
                            <Button className="icon_buttons">
                                <ShareIcon className="icons icon_border" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bottom_div">
                    <div className="music_contols">
                        <Button className="icon_buttons">
                            {suffle ? (
                                <ShuffleIcon
                                    className="icons main_button"
                                    onClick={() => setSuffle(!suffle)}
                                />
                            ) : (
                                <ShuffleIcon
                                    className="icons"
                                    onClick={() => setSuffle(!suffle)}
                                />
                            )}
                        </Button>
                        <Button className="icon_buttons">
                            <RepeatOneIcon className="icons" />
                        </Button>
                        <Button className="icon_buttons">
                            <KeyboardArrowLeftIcon
                                onClick={() => {
                                    if (number === 0) {
                                        setNumber(2);
                                    } else {
                                        setNumber(number - 1);
                                    }
                                    play();
                                }}
                                className="icons icon_border main_button"
                            />
                        </Button>
                        <Button className="icon_buttons">
                            {isPlaying ? (
                                <PauseCircleFilledIcon
                                    onClick={() => play()}
                                    className="icons icon_border play_button main_button"
                                />
                            ) : (
                                <PlayCircleFilledIcon
                                    onClick={() => play()}
                                    className="icons icon_border play_button main_button"
                                />
                            )}
                        </Button>
                        <Button className="icon_buttons">
                            <KeyboardArrowRightIcon
                                onClick={() => {
                                    setNumber(number + 1);
                                    play();
                                }}
                                className="icons icon_border main_button"
                            />
                        </Button>
                        <Button className="icon_buttons">
                            <RepeatIcon className="icons" />
                        </Button>
                        <Button className="icon_buttons">
                            <EqualizerIcon className="icons" />
                        </Button>
                    </div>
                    <div className="music_bar">
                        <Slider
                            percentage={percentage}
                            onChange={onChange}
                            duration={duration}
                            currentTime={currentTime}
                        />
                        <audio
                            ref={audioRef}
                            onTimeUpdate={getCurrDuration}
                            onLoadedData={(e) => {
                                setDuration(
                                    e.currentTarget.duration.toFixed(2)
                                );
                            }}
                            src={song}
                        ></audio>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
