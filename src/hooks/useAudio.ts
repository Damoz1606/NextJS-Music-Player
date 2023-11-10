import { AudioContext } from "@/context/AudioContext"
import { useContext } from "react"

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error("'useAudio' hook can only be use inside an AudioContext");
    }
    return context;
}