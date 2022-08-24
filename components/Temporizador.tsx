import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import styles from '../styles/Temporizador.module.css'

interface TemporizadorProps {
    key: any
    duracao: number
    tempoEsgotado: () => void
}

export default function Temporizador({ duracao, tempoEsgotado }: TemporizadorProps) {
    const tercoDaDuracao = duracao / 3 

    return (
        <div className={styles.temporizador}>
            <CountdownCircleTimer
                size={100}
                isPlaying
                duration={duracao}
                onComplete={tempoEsgotado}
                colors={[
                    '#BCE596',
                    '#F7B801',
                    '#ED827A'
                ]}
                colorsTime={[
                    duracao - tercoDaDuracao * 1,
                    duracao - tercoDaDuracao * 2,
                    duracao - tercoDaDuracao * 3
                ]}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
    )
}