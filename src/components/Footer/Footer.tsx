import styles from './styles.module.css';

type Props = {
    text?: string; //interrogação deixa a prop não obrigatória 
}

export const Footer = ({ text }: Props) => {
    return (
        <footer className={styles.square} >
                <p className={styles.text}>{text}</p>
                
        </footer>
    )
}
