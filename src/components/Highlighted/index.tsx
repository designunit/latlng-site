import s from './styles.module.css'


export const Highlighted: React.FC = props => {
    return (
        <span className={s.highlight}>
            {props.children}
        </span>
    )
}