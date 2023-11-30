import React from 'react'
import {
  Box,
  HStack,
  VStack,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react'
import { NavbarList } from './NavBarList'
import Image from 'next/image'
import Logo from '../../assets/images/Logo.png'
import { FaBars, FaArrowLeft } from 'react-icons/fa'
interface List {
  title: string
  href: string
}
export const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
      left="0"
      w={{ base: isOpen ? '100%' : '0rem', md: isOpen ? '12rem' : '0rem' }}
      h="full"
      bg="black"
      zIndex="1"
      transition="width 0.3s"
    >
      <HStack>
        <Image
          alt="Logo"
          src={Logo}
          width={80}
          style={{ marginInline: 15, marginTop: 10 }}
        />
        <IconButton
          icon={<FaArrowLeft />}
          aria-label="Close menu"
          onClick={onClose}
          variant="white"
          color={'white'}
        />
      </HStack>

      {isOpen ? (
        <VStack spacing="4" align="flex-start">
          {list.map((item) => (
            <Box
              key={item.href}
              cursor="pointer"
              _hover={{ color: 'blue.500' }}
            >
              <NavbarList list={[item]} />
            </Box>
          ))}
          {/* Botão para fechar o menu lateral em telas menores */}
          <HStack
            display={{ base: 'flex', md: 'none' }}
            position="fixed"
            top="0"
            right="4"
            p="4"
            color="white"
          >
            <IconButton
              icon={<FaArrowLeft />}
              aria-label="Close menu"
              onClick={onClose}
              variant="ghost"
            />
          </HStack>
        </VStack>
      ) : (
        <HStack
          display="flex"
          position="fixed"
          top="0"
          right="4"
          p="4"
          color="white"
        >
          <IconButton
            icon={<FaBars />}
            aria-label="Open menu"
            onClick={onOpen}
            variant="ghost"
          />
        </HStack>
      )}
      {/* Botão para recolher o menu lateral em telas maiores */}
      {isOpen && (
        <HStack
          display={{ base: 'none', md: 'flex' }}
          position="fixed"
          top="0"
          right="4"
          p="4"
          color="white"
        >
          <IconButton
            icon={<FaArrowLeft />}
            aria-label="Close menu"
            onClick={onClose}
            variant="ghost"
          />
        </HStack>
      )}
    </Box>
  )
}
