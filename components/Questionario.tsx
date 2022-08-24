import QuestaoModel from "../model/questao"

import styles from '../styles/Questionario.module.css'
import Botao from "./Botao"
import Questao from "./Questao"

interface QuestionarioProps {
    questao: QuestaoModel
    ultima: boolean
    questaoRespondida: (questao: QuestaoModel) => void
    irProximoPasso: () => void
}

export default function Questionario({ questao, ultima, questaoRespondida, irProximoPasso }: QuestionarioProps) {
    function respostaFornecida(indice: number) {
        if(questao.nãoRespondida) {
            questaoRespondida(questao.responderCom(indice))
        }
    }

    return (
        <div className={styles.questionario}>
            {questao ?
                <Questao
                    valor={questao}
                    tempoPraResposta={10}
                    respostaFornecida={respostaFornecida}
                    tempoEsgotado={irProximoPasso}
                /> : false
            }
            <Botao
                onClick={irProximoPasso}
                texto={ultima ? 'Finalizar' : 'Próxima'}
                href={ultima? '/resultado' : undefined}
            />
        </div>
    )
}