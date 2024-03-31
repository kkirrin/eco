import Link from "next/link"

import {useMain, useStater} from '@/hooks/useStater'

import styles from '@/app/css/header.module.css'
import {useActions} from "@/hooks/useActions";

export const NavigationBar = ({place = 'header', burgerSetter = false}) => {

  const menu = useStater('menu')
  const {mobile} = useMain('main')

  const {toggleModal} = useActions()

  const closedBurger = () => {
    burgerSetter(false);
  }

  return(
    <nav className = {`${styles.nav}`}>

        {
            (mobile) ?
                   <Link
                       onTouchStart = { (e) => {
                         burgerSetter(false)
                       }}
                       href = "/routes/shop">Каталог</Link>
                : null
        }
      {
        (menu) ?
          menu.map((item, index) => {
            return(
              <Link onClick = {(typeof(burgerSetter) === 'function') ? closedBurger : null} href={item.href} key={`navmenu_${index}`}>{item.name}</Link>
            )
          })
              : null
      }
        {
            (mobile) ?
                <>
                    <Link onTouchStart = { (e) => {
                      burgerSetter(false)
                    }}
                                        href = "/routes/pages/delivery">Оплата и доставка</Link>
                    <p onTouchStart = { (e) => {
                        e.preventDefault()
                        burgerSetter(false)
                        toggleModal();
                    }} href = "/">Вход и регистрация</p>
                </>
                : null
        }
    </nav>
  )
}
