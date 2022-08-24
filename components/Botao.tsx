import Link from 'next/link'
import styles from '../styles/Botao.module.css'

interface BotaoProps {
    href?: string
    texto: string
    onClick?: (e: any) => void
}

export default function Botao({ href, texto, onClick }: BotaoProps) {
    function renderizarBotao() {
        return (
            <button className={styles.botao} onClick={onClick}>
                {texto}
            </button>
        )
    }

    return href ? (
        <Link href={href} >
            {renderizarBotao()}
        </Link>
    ) : renderizarBotao()
}