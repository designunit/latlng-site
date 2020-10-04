import s from './title.module.css'

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

export const Title: React.FC<Props> = props => (
    <h1 {...props} className={s.title}>
        <span>
            LATL.NG<br />

            <span className={s.subtitle}>
                cloud geoinformation system
                </span>
        </span>
    </h1>
)
