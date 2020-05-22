import s from './styles.module.css'
import { LinkContainer } from '../LinkContainer'
import { Highlighted } from '../Highlighted'

export const Button: React.FC = props => (
    <LinkContainer
        url=''
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
        }}
    >
        <div className={s.arrow}>
            -->
        </div>
        <div className={s.button}>
            Try LATL.NG
        </div>
        <div className={s.arrow}>
            {'<--'}
        </div>
    </LinkContainer>
)