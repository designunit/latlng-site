import s from './item.module.css'

export type ItemProps = {
    style?: React.CSSProperties
}

export const Item: React.FC<ItemProps> = props => (
    <div
        className={s.item}
        style={props.style}
    >
        {props.children}
    </div>
)
