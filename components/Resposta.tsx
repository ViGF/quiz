import RespostaModel from "../model/resposta"
import styles from '../styles/Resposta.module.css'

interface RespostaProps {
    valor: RespostaModel
    indice: number
    letra: string
    corFundoLetra: string
    respostaFornecida: (indice: number) => void
}

export default function Resposta({ valor, indice, letra, corFundoLetra, respostaFornecida }: RespostaProps) {
    const respostaRevelada = valor.revelada ? styles.respostaRevelada : ''

    return (
        <div className={styles.resposta}
            onClick={() => respostaFornecida(indice)}
        >
            <div className={`${respostaRevelada} ${styles.conteudoResposta}`}>
                <div className={styles.frente}>
                    <div className={styles.letra}
                        style={{ backgroundColor: corFundoLetra }}
                    >
                        {letra}
                    </div>
                    <div className={styles.valor}>
                        {valor.valor}
                    </div>
                </div>
                <div className={styles.verso}>
                    {valor.certa ? (
                        <div className={styles.certa}>
                            <div>A resposta certa é...</div>
                            <div className={styles.valor}>{valor.valor}</div>
                        </div>
                    ) : (
                        <div className={styles.errada}>
                            <div>A resposta informada está errada...</div>
                            <div className={styles.valor}>{valor.valor}</div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}