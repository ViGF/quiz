import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'

const BASE_URL = 'https://quiz-vigf.vercel.app/api'

export default function Home() {
  const router = useRouter()

  const [idsQuestoes, setIdsQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState(0)

  async function carregarIdsQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsQuestoesResp = await resp.json()

    setIdsQuestoes(idsQuestoesResp)
  }

  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const json = await resp.json()

    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestao)
  }

  useEffect(() => {
    carregarIdsQuestoes()
  }, [])

  useEffect(() => {
    idsQuestoes.length > 0 && carregarQuestao(idsQuestoes[0])
  }, [idsQuestoes])

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)

    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }

  function idProximaPergunta() {
    const proximoIndice = idsQuestoes.indexOf(questao.id) + 1
    return idsQuestoes[proximoIndice]
  }

  function irProximoPasso() {
    const proximoId = idProximaPergunta()

    proximoId ? irProximaQuestao(proximoId) : finalizar()
  }

  function irProximaQuestao(proximoId: number) {
    carregarQuestao(proximoId)
  }

  function finalizar() {
    router.push({
      pathname: '/resultado',
      query: {
        total: idsQuestoes.length,
        certas: respostasCertas
      }
    })
  }

  return questao ? (
    <Questionario
      questao={questao}
      ultima={idProximaPergunta() === undefined}
      questaoRespondida={questaoRespondida}
      irProximoPasso={irProximoPasso}
    />
  ) : false
}
