import Link from 'next/link'

import {
  ChakraComponent,
  ComponentWithAs,
  Flex,
  FlexProps,
  Text,
  chakra,
} from '@chakra-ui/react'

export interface iNavLink {
  isActive?: boolean
  href: string
  as: string

  title: string
}

const NavLinkStyle: ChakraComponent<
  ComponentWithAs<'div', FlexProps>,
  { isCollapse: boolean; isActive: boolean }
> = chakra(Flex, {
  shouldForwardProp: (props) => !['isCollapse', 'isActive'].includes(props),

  baseStyle: ({ isCollapse, isActive }: any) => ({
    bg: 'black',
    px: '10',
    py: '4',
    fontFamily: 'Rubik',
    fontWeight: 'bold',

    color: 'white',

    _hover: {
      color: 'primary',
    },
    ...(isCollapse && {
      justifyContent: 'flex-start',

      px: '15',
    }),

    ...(isActive && {
      '& > i': {
        color: 'primary',
      },
      '& > p': {
        color: '#1ce686',
      },
    }),
  }),
})

export function NavLink({ title, href, isActive, as }: iNavLink) {
  return (
    <Link href={href} as={as} passHref>
      <NavLinkStyle isActive={Boolean(isActive)} isCollapse>
        <Text>{title}</Text>
      </NavLinkStyle>
    </Link>
  )
}
