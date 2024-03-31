import React from 'react'
import Image from "next/image";

import styles from '@/app/css/header.module.css'
import {useGetContactsQuery} from "@/redux/api/contacts.api";
import {useMain} from "@/hooks/useStater";
import {useActions} from "@/hooks/useActions";

export const CallBack = ({}) => {

    const {isLoading, error, data} = useGetContactsQuery();

    const {mobile, showModal} = useMain();
    const {toggleModal} = useActions()

    const openCallButton = (evt) => {
        evt.preventDefault()
        toggleModal('callback')
    }

    return(
    <button className = {styles.buttonCallBack}>
      <div>
          <svg xmlns="https://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
              <path d="M12.5562 13.9062L12.1007 14.359C12.1007 14.359 11.0181 15.4355 8.0631 12.4972C5.10812 9.55901 6.1907 8.48257 6.1907 8.48257L6.4775 8.19738C7.1841 7.49484 7.2507 6.36691 6.6342 5.54348L5.37326 3.85908C4.61028 2.83992 3.13596 2.70529 2.26145 3.57483L0.691848 5.13552C0.258228 5.56668 -0.0323518 6.12559 0.0028882 6.74561C0.0930382 8.33182 0.810708 11.7447 4.81536 15.7266C9.0621 19.9492 13.0468 20.117 14.6763 19.9651C15.1917 19.9171 15.6399 19.6546 16.0011 19.2954L17.4217 17.883C18.3806 16.9295 18.1102 15.2949 16.8833 14.628L14.9728 13.5894C14.1672 13.1515 13.1858 13.2801 12.5562 13.9062Z" fill="#434950"/>
          </svg>
          <a href = {`tel:${(!isLoading) ? (typeof data != 'undefined' && data?.data != 'undefined') ? data.data[0].attributes.MainTel : null : null}`}>{`${(!isLoading) ? (typeof data != 'undefined' && data.data != 'undefined') ? data.data[0].attributes.MainTel : null : `Загрузка...`}`}</a>
      </div>
      <a
          onClick = {
            (evt) => {
                if(!mobile)
                  openCallButton(evt)
            }
          }
          ontTouchStart = {
              (evt) => {
                  if(!mobile)
                    openCallButton(evt)
              }
          }
          href = "/">Заказать звонок</a>
    </button>
  )
}
