import QuestaoModel from "../model/questao"
import styles from '../styles/Questao.module.css'
import Enunciado from "./Enunciado"
import Resposta from "./Resposta"
import Temporizador from "./Temporizador"

const letras = [
    { valor: 'A', cor: '#F2C866' },
    { valor: 'B', cor: '#F266BA' },
    { valor: 'C', cor: '#25D4F2' },
    { valor: 'D', cor: '#BCE596' },
]

interface QuestaoProps {
    valor: QuestaoModel
    tempoPraResposta?: number
    respostaFornecida: (indice: number) => void
    tempoEsgotado: () => void
}

export default function Questao({ valor, tempoPraResposta = 10, respostaFornecida, tempoEsgotado }: QuestaoProps) {
    function renderizarRespostas() {
        return valor.respostas.map((resposta, i) => {
            return (
                <Resposta
                    key={`${valor.id}-${i}`}
                    valor={resposta}
                    indice={i}
                    letra={letras[i].valor}
                    corFundoLetra={letras[i].cor}
                    respostaFornecida={respostaFornecida}
                />
            )
        })
    }

    return (
        <div className={styles.questao}>
            <Enunciado texto={valor.enunciado} />
            <Temporizador
                key={valor.id}
                duracao={tempoPraResposta}
                tempoEsgotado={tempoEsgotado}
            />
            {renderizarRespostas()}
        </div>
    )
}