import { Section } from "../Section"
import { Ratio } from "../Ratio"
import { Highlighted } from "../Highlighted"
import { useMedia } from "react-use"


const About: React.FC = props => {
    const isMobile = useMedia('(max-width: 768px)', false)
    
    return (
        <Section style={{
            userSelect: 'none',
        }}>
            <Ratio
                left={7}
                right={3}
                leftContent={(
                    <div style={{
                        userSelect: 'text',
                        textAlign: isMobile ? 'justify' : null
                    }}>
                        Открытая интерактивная карта позволяет в реальном времени картировать информацию в короткие сроки за счет привлечения местных команд волонтеров. <Highlighted>Алгоритмы обработки данных позволяют</Highlighted> выявить <Highlighted>форматы и сценарии использования,</Highlighted> устоявшиеся практики и аудитории. Сервис позволяет жителям самостоятельно вносить информацию о городских объектах. Горожане сами картируют свои ценности и видят ценности других горожан.
                        <br/><br/>
                        Сервис содержит данные о маршрутах общественного транспорта и позволяет строить графики доступности территории и города <Highlighted>в задаваемом временном промежутке</Highlighted> для различных способов и средств передвижения. Встроенные алгоритмы обработки данных позволяют в реальном времени анализировать собранную информацию и визуализирировать ее в понятных графиках, схемах
                    </div>
                )}
            />
        </Section>        
    )
}

export default About