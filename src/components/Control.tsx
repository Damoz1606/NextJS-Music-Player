import React, { useEffect, useState } from 'react';
import styles from '@/styles/Control.module.css';
import { FavoriteRounded, OpenInNewRounded, PauseRounded, PlayArrowRounded, SkipNextRounded, SkipPreviousRounded } from '@mui/icons-material';

type ControlProps = {
    url: string;
    play?: boolean;
    onPlayChange?: (state: boolean) => void;
    onNext?: () => void;
    onPrevious?: () => void;
}

const Control: React.FC<ControlProps> = ({ onPlayChange, onNext, onPrevious, url, play = false }) => {

    const [isPlaying, setIsPlaying] = useState<boolean>(play);

    useEffect(() => {
        setIsPlaying(play);
        return () => { }
    }, [play])


    const togglePlaying = () => {
        setIsPlaying(!isPlaying);
        onPlayChange?.(isPlaying);
    }

    const handleNext = () => onNext?.();
    const handlePrev = () => onPrevious?.();

    const handleOpenInNewTab = () => {
        window.open(url, "_blank", "noopener, noreferrer");
    }

    return (
        <div className={`${styles.controls}`}>
            <button className={`${styles.control}`} disabled><FavoriteRounded sx={{ width: "100%", height: "100%" }} /></button>
            <button className={`${styles.control}`} onClick={handleOpenInNewTab}><OpenInNewRounded sx={{ width: "100%", height: "100%" }} /></button>
            <button className={`${styles.control}`} onClick={handleNext}><SkipNextRounded sx={{ width: "100%", height: "100%" }} /></button>
            <button className={`${styles.control}`} onClick={handlePrev}><SkipPreviousRounded sx={{ width: "100%", height: "100%" }} /></button>
            <button className={`${styles.control} ${styles.action}`} onClick={togglePlaying}>
                {!isPlaying ? <PlayArrowRounded sx={{ width: "100%", height: "100%" }} /> : <PauseRounded sx={{ width: "100%", height: "100%" }} />}
            </button>
        </div>
    )
}

export { Control }