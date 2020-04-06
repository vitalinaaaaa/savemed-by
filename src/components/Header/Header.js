import React, { memo } from 'react'

import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <a href="https://molamola.by/campaigns?category_id=10&sort=popular">
        Поддержать наших медиков <span>👨‍⚕️👩‍⚕️</span>
      </a>
    </header>
  )
}

export default memo(Header)
