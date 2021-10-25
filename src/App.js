import "./App.css";
import React, { useEffect, useState } from "react";
import musiclist from "./music";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ShareIcon from "@mui/icons-material/Share";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import EqualizerIcon from "@mui/icons-material/Equalizer";

function App() {
    const [number, setNumber] = useState(0);
    const [music, setMusic] = useState("");
    const [like, setLike] = useState(false);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        setMusic(musiclist[number]);
    }, [number]);
    return (
        <div className="App">
            <div className="music_player">
                <div className="top_div">
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
                            {like ? (
                                <FavoriteIcon className="icon_border" />
                            ) : (
                                <FavoriteBorderIcon className="icons icon_border" />
                            )}
                            <PlaylistAddIcon className="icons icon_border" />
                            <ShareIcon className="icons icon_border" />
                        </div>
                    </div>
                </div>

                <div className="bottom_div">
                    <div className="music_contols">
                        <ShuffleIcon className="icons" />
                        <RepeatOneIcon className="icons" />
                        <KeyboardArrowLeftIcon className="icons icon_border main_button" />
                        {playing ? (
                            <PlayCircleFilledIcon className="icons icon_border play_button main_button" />
                        ) : (
                            <PauseCircleFilledIcon className="icons icon_border play_button main_button" />
                        )}
                        <KeyboardArrowRightIcon className="icons icon_border main_button" />
                        <RepeatIcon className="icons" />
                        <EqualizerIcon className="icons" />
                    </div>
                    <div className="music_bar">===========================</div>
                </div>
            </div>
        </div>
    );
}

export default App;
