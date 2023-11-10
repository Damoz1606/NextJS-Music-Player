import { Audio } from "@/types";
import { ReactNode, SyntheticEvent, createContext, useContext, useEffect, useRef, useState } from "react";

type AudioContextProps = {
    index: number;
    metadata: Audio;
    time: number;
    duration: number;
    isPlaying: boolean;
    setIndex: (value: number) => void;
    play: () => void;
    pause: () => void;
    next: () => void;
    previous: () => void;
    setTime: (value: number) => void;
}

const AudioContext = createContext<AudioContextProps>({
    index: 0,
    metadata: { cover: "", source: "", url: "" },
    time: 0,
    duration: 0,
    isPlaying: true,
    setIndex: () => { },
    play: () => { },
    pause: () => { },
    next: () => { },
    previous: () => { },
    setTime: () => { }
});

type AudioProviderProps = {
    audios: Audio[];
    children: ReactNode;
}

const AudioProvider: React.FC<AudioProviderProps> = ({ audios, children }) => {

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioPlayer = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioPlayer.current)
            audioPlayer.current.load();
        return () => { }
    }, []);


    const handleMetadata = (event: SyntheticEvent<HTMLAudioElement>) => {
        const duration = event.currentTarget.duration;
        setDuration(duration);
    }

    const handleTimeUpdate = (event: SyntheticEvent<HTMLAudioElement>) => {
        const currentDuration = event.currentTarget.duration;
        const time = event.currentTarget.currentTime;
        if (time === currentDuration) {
            next();
        }
        setCurrentTime(time);
    }

    const play = () => {
        if (audioPlayer.current) {
            audioPlayer.current.play();
            setIsPlaying(true);
        }
    }

    const pause = () => {
        if (audioPlayer.current) {
            audioPlayer.current.pause();
            setIsPlaying(false);
        }
    }

    const next = () => {
        if (audioPlayer.current) {
            let index = currentIndex + 1;
            if (currentIndex >= audios.length) {
                index = 0;
            }
            setIndex(index);
            play();
        }
    }

    const previous = () => {
        if (audioPlayer.current) {
            let index = currentIndex - 1;
            if (currentIndex < 0) {
                index = audios.length - 1;
            }
            setIndex(index);
            play();
        }
    }

    const setTime = (value: number) => {
        if (audioPlayer.current)
            audioPlayer.current.currentTime = value;
    }

    const setIndex = (index: number) => {
        setCurrentIndex(index);
        setTime(0);
        if (audioPlayer.current)
            audioPlayer.current.load();
    }

    const value: AudioContextProps = {
        index: currentIndex,
        metadata: audios[currentIndex],
        time: currentTime,
        duration,
        isPlaying,
        setIndex,
        play,
        pause,
        next,
        previous,
        setTime
    }

    return (
        <AudioContext.Provider value={value}>
            <audio
                ref={audioPlayer}
                preload='metadata'
                onLoadedMetadata={handleMetadata}
                onTimeUpdate={handleTimeUpdate}>
                <source src={audios[currentIndex].source} type='audio/mp3' />
                Ooops, your browser is old
            </audio>
            {children}
        </AudioContext.Provider>
    );
}

export { AudioProvider, AudioContext }