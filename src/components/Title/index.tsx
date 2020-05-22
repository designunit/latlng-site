import { useMedia } from "react-use"


const Title: React.FC = props => {
    const isMobile = useMedia('(max-width: 768px)', false)

    return (
        <h1 style={{
            flex: '1 0 50%',
            userSelect: 'text',
        }}>
            LATL.NG <br/>
            <span style={{
                fontSize : isMobile ? '26px' : null
            }}>
                cloud geoinformation system
            </span>
        </h1>
    )
}

export default Title