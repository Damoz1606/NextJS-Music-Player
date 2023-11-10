import Head from 'next/head'
import { Rubik } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { AudioProvider } from '@/context/AudioContext'
import { audioTracks } from '@/store'
import { Player } from '@/components/Player'
import { Playlist } from '@/components/Playlist'

/* https://codesandbox.io/s/react-audio-player-with-hooks-xj4897445q?file=/src/components/Player/Audio.js:2071-2079 */

const rubik = Rubik({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <Head>
        <title>Music Player</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.wrapper} ${rubik.className}`}>
        <AudioProvider audios={audioTracks}>
          <Playlist />
          <Player />
        </AudioProvider>
      </main>
    </>
  )
}
