import s from './styles.module.css'
import Link from 'next/link'
import { CSSProperties } from 'react'

interface LinkContainerProps {
   url: string
   style?: CSSProperties 
   external?: boolean
}

export const LinkContainer: React.FC<LinkContainerProps> = ({ url, style, external = false, ...props }) => {
   if (external) {
      return (
         <a
            className={s.aTag}
            href={url}
            style={style}
            target='_blank'
         >
            {props.children}
         </a>
      )
   } else {
      return (
         <Link
            href={url}
         >
            <a
               className={s.aTag}
               href={url}
               style={style}
            >
               {props.children}
            </a>
        </Link>
      )
   }
}