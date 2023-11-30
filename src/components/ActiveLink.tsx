import { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { forwardRef } from 'react'

interface ActiveLinkProp extends LinkProps {
  shouldMatchExactHref?: boolean
  children: JSX.Element
}

export const ActiveLink = ({
  shouldMatchExactHref = false,
  children,
  ...rest
}: ActiveLinkProp) => {
  let isActive = false

  const { asPath, pathname } = useRouter()

  if (
    shouldMatchExactHref &&
    (asPath === children.props.href || asPath === children.props.as)
  ) {
    isActive = true
  }

  if (
    !shouldMatchExactHref &&
    (asPath.startsWith(String(children.props.href)) ||
      asPath.startsWith(String(children.props.as)))
  ) {
    isActive = true
  }

  return React.cloneElement(children, { isActive, ...rest })
}
