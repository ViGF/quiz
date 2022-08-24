import questoes from '../bancoDeQuestoes'

export default function handler(req, res) {
    const idSelecionado = +req.query.id

    const questoesSelecionadas = questoes.filter(questao => questao.id === idSelecionado)

    if (questoesSelecionadas.length === 1) {
        const questaoSelecionada = questoesSelecionadas[0].embaralharRespostas()

        res.status(200).json(questaoSelecionada.converterParaObjeto())
    } else {
        res.status(204).send()
    }

}