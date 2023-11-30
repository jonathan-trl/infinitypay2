import { v4 as uuidV4 } from 'uuid'

import { ActiveLink } from '../ActiveLink'

import { NavLink } from './Link'

interface ItemListProps {
  title: string
  href: string
}

interface NavbarListProps {
  list: ItemListProps[]
}

const NavbarList = ({ list }: NavbarListProps) => {
  return (
    <ul className="flex flex-col items-start justify-center">
      {list.map(({ title, href }) => {
        return (
          <li className="w-full" key={uuidV4()}>
            <ActiveLink href={href} shouldMatchExactHref={false}>
              <NavLink title={title} as={href} href={href} />
            </ActiveLink>
          </li>
        )
      })}
    </ul>
  )
}

export { NavbarList }
