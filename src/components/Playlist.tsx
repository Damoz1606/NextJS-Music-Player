import React, { useState } from 'react'
import style from '@/styles/Playlist.module.css'
import { List } from '@mui/icons-material'
import { useAudio } from '@/hooks/useAudio'

const Playlist: React.FC = () => {

    const audio = useAudio();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    const onTrackSelected = (index: number) => {
        setOpen(false);
        audio.setIndex(index);
    }

    return (
        <div className={`${style.container}`}>
            <button onClick={handleOpen}>
                <List />
            </button>
            <div className={`${style.list} ${!open ? style.closed : ""}`}>
                <div className={`${style.shadow}`}></div>
                {
                    audio.metadatas.map((data, index) =>
                    (<div className={`${style.item} ${index === audio.index ? style.selected : ""}`} key={index} onClick={() => onTrackSelected(index)}>
                        <p className={`${style.track}`}>{data.song}</p>
                        <p className={`${style.artist}`}>{data.artist}</p>
                    </div>
                    ))
                }
                <div className={`${style.shadow}`}></div>
            </div>
        </div>
    )
}

export { Playlist }