import React, { useState } from 'react';
import { TrackBar } from './TrackBar';
import { Control } from './Control';
import Image from 'next/image'
import styles from '@/styles/Player.module.css';
import { useAudio } from '@/hooks/useAudio';

const Player: React.FC = () => {

    const audio = useAudio();

    const handleTrackClick = (newPercent: number) => audio.setTime(newPercent * audio.duration);
    return (
        <div className={`${styles.container} neumorph outer`}>
            <div className={`${styles.top}`}>
                <div className={`${styles.cover}`}>
                    <Image className='neumorph outer' src={audio.metadata.cover} width={100} height={100} alt={''} priority />
                </div>
                <Control
                    play={audio.isPlaying}
                    url={audio.metadata.url}
                    onNext={audio.next}
                    onPrevious={audio.previous}
                    onPlayChange={(flag) => flag ? audio.pause() : audio.play()} />
            </div>
            <div className={`${styles.progress}`}>
                <div className={`${styles.top}`}>
                    <div className={`${styles.album}`}>
                        <p className={`${styles.track}`}>{audio.metadata.song}</p>
                        <p className={`${styles.name}`}>{audio.metadata.artist}</p>
                    </div>
                </div>
                <TrackBar seconds={audio.duration} progressPercent={audio.time / audio.duration} onClick={handleTrackClick} />
            </div>
        </div>
    )
}

export { Player };