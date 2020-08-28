import { Section } from "../Section"
import { Ratio } from "../Ratio"
import { Highlighted } from "../Highlighted"
import { createBreakpoint } from "react-use"
import { LinkText } from "../LinkText"

const breakpoint = createBreakpoint({ mobile: 0, desktop: 1025 })

const About: React.FC = props => {
    const isMobile = breakpoint() === 'mobile' 
    
    return (
        <Section style={{
            userSelect: 'none',
        }}>
            <Ratio
                left={isMobile ? 1 : 7}
                right={isMobile ? 0 : 3}
                leftContent={(
                    <p style={{
                        userSelect: 'text',
                        textAlign: isMobile ? 'justify' : null,
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <span style={{
                           marginBottom: '1rem',
                        }}>
                           инструмент совместной коллективной работы с геопривязанной информацией.
                        </span>
                        <span style={{
                           marginBottom: '1rem',
                        }}>
                           позволяет делать авторские тематические и пользовательские карты с различными вариантами оформления, вносить геопривязанную информацию различных форматов (тексты, фото, аудиозаписи, сканы документов) организованными группами исследователей, волонтеров, неорганизованными индивидуалами, собирать геопривязанные ценности нематериальной культуры, выводить собранную информацию в виде аналитических карт и графиков. 
                        </span>
                        <span style={{
                           marginBottom: '1rem',
                        }}>
                           различные функции сервиса протестированы в ряде исследовательских проектов городской среды: исследования стационарных активностей по методу яна гейла, сбор отзывов и пожеланий горожан по развитию города, социологическое наблюдение использования открытых городских пространств.
                        </span>
                        <span>
                           по деталям сервиса не стесняйтесь обращаться{' '}
                           <a 
                              href='mailto:inbox@unit4.io'
                              style={{
                                 textDecoration: 'none',
                              }}
                           >
                              <LinkText>
                                 <span style={{
                                    fontSize: 'var(--font-size)',
                                 }}>
                                    inbox@unit4.io
                                 </span>
                              </LinkText>
                           </a>
                        </span>
                    </p>
                )}
            />
        </Section>        
    )
}

export default About