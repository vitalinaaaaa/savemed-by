import React, { memo, useState } from 'react'

import { ReactComponent as Icon } from '@static/icons/info.svg'

import styles from './Info.module.css'

function Info() {
  const [visible, setVisible] = useState(false)

  function toggle() {
    setVisible(!visible)
  }

  return (
    <>
      {visible && (
        <div className={styles['info-text']}>
          <span>
            Эта карта предназначена для координации волонтёров и медиков. Опишите с помощью <a href="https://t.me/spasyom_bel_bot" rel="noopener noreferrer" target="_blank">бота</a>, чем вы готовы помочь:
          </span>
          <span>
            <span>🚗</span> - доставка / развоз
          </span>
          <span>
            <span>🍔</span> - готовка еды / закупка продуктов
          </span>
          <span>
            <span>🏡</span> - предоставление жилья
          </span>
          <span>
            <span>💰</span> - финансирование
          </span>
          <span>
            <span>📢</span> - распространение информации
          </span>
          <span>
            <span>✋</span> - другое
          </span>
          <span>
            Eсли вы медик и вашему учреждению чего-то не хватает, то напишите свой запрос. На карте он будет обозначен красным цветом и иконкой 👩‍⚕️.
          </span>
        </div>
      )}
      <button className={styles['info-button']} type="button" onClick={toggle}><Icon /></button>
    </>
  )
}

export default memo(Info)
