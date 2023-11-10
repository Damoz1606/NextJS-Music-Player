import React, { useEffect, useState } from 'react';
import styles from '@/styles/TrackBar.module.css'
import { formatMinutes } from '@/utils';


type TrackBarProps = {
    seconds: number;
    progressPercent: number;
    onClick?: (value: number) => void;
}

const TrackBar: React.FC<TrackBarProps> = ({ progressPercent, seconds, onClick }) => {

    const [currentSeconds, setCurrentSeconds] = useState(0);

    useEffect(() => {
        setCurrentSeconds(formatSeconds(progressPercent));
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progressPercent]);

    const formatSeconds = (value: number): number => {
        return value * Math.max(seconds, 1);
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const bar = event.currentTarget;
        const clickPosition = event.clientX - bar.getBoundingClientRect().left;
        const barWidth = bar.clientWidth;
        const newSeconds = (clickPosition / barWidth) * seconds;
        const percent = newSeconds/seconds;
        setCurrentSeconds(formatSeconds(percent));
        console.log(newSeconds);
        onClick?.(percent);
    };

    return (
        <div className={styles.container}>
            <p className={`${styles.duration}`}>{formatMinutes(seconds)}</p>
            <div className={`${styles.bar}`} onClick={handleClick}>
                <div className={`${styles.current}`} style={{ width: `${progressPercent * 100}%` }}></div>
            </div>
            <p className={`${styles.time}`}>{formatMinutes(currentSeconds)}</p>
        </div>
    )
}

export { TrackBar }