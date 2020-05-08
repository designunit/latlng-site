import s from './styles.module.css'

export const LinkText: React.FC = props => {
    return (
        <span className={s.linkStyle}>
            {props.children}
        </span>
    )
}