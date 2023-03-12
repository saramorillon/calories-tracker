import { IconLogout } from '@tabler/icons'
import dayjs, { extend } from 'dayjs'
import 'dayjs/locale/fr'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import React from 'react'
import { Link } from 'react-router-dom'

extend(localizedFormat)

export function Header(): JSX.Element {
  return (
    <nav aria-label="Main">
      <Link to="/">
        <strong>{dayjs(new Date()).locale('fr').format('LL')}</strong>
      </Link>

      <a href="/api/logout" className="ml-auto">
        <IconLogout /> Log out
      </a>
    </nav>
  )
}
