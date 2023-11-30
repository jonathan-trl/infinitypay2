import React from 'react'
import { Box } from '@chakra-ui/react'
import { NavbarList } from './NavBarList'
import Image from 'next/image'
import Logo from '../../assets/images/Logo.png'
interface List {
  title: string
  href: string
}
export const NavBar = () => {
  const Create = () => ({
    icon(solid: JSX.Element, rounded: JSX.Element) {
      return {
        solid,
        rounded,
      }
    },

    list({ title, href }: List) {
      return {
        title,
        href,
      }
    },
  })

  const create = Create()

  const useNavbar = () => {
    const list = [
      create.list({
        title: 'DashBoard',
        href: '/dashboard',
      }),
      create.list({
        title: 'Contas',
        href: '/acounts',
      }),

      create.list({
        title: 'Cash In',
        href: '/cashin',
      }),

      create.list({
        title: 'Cash Out',
        href: '/cashout',
      }),

      create.list({
        title: 'Insenção de taxa',
        href: '/exemption',
      }),

      create.list({
        title: 'Afiliados',
        href: '/affiliates',
      }),
    ]

    return list
  }

  const list = useNavbar()
  return (
    <Box
      position="fixed"
      top="0"
      w="48"
      h="full"
      bg="black"
      borderRight="1px"
      borderColor="gray.300"
      transition="all"
      transitionDuration="300ms"
      transitionTimingFunction="ease-in-out"
    >
      <Image
        alt="Logo"
        src={Logo}
        width={80}
        style={{ marginInline: 15, marginTop: 10 }}
      />
      <nav>
        <NavbarList list={list} />
      </nav>
    </Box>
  )
}
