import React from 'react'
import useArrowKeys from 'react-arrow-key-navigation-hook'

import * as S from '../Palette.style'

import { copyToClipboard } from 'copy-lite'

import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'

import {
  FaSearch,
  FaGithub,
  FaGitlab,
  FaCode,
  FaCodeBranch,
  FaInfoCircle,
  FaNewspaper,
  FaSignOutAlt,
  FaUser,
  FaEdit,
  FaCopy,
  FaDownload,
  FaShare,
  FaAngleLeft,
  FaLink,
  FaTrash,
} from 'react-icons/fa'
import { Snip as SnipType, User } from '.prisma/client'

const Palette: React.FC<{
  snip: SnipType
  snips: SnipType[] | undefined
  user: User | undefined
}> = ({ snip, snips, user }) => {
  const [open, setOpen] = React.useState(false)
  const [subMenu, setSubMenu] = React.useState('main')

  const inputRef = React.useRef<HTMLInputElement>(null)
  const [query, setQuery] = React.useState('')

  const parentRef = useArrowKeys({ selectors: 'a,input' })

  const { data: session, status } = useSession()
  const router = useRouter()

  React.useEffect(() => {
    if (open && subMenu === 'main') inputRef.current!.focus()
    else if (open && subMenu === 'snips') inputRef.current!.focus()
  }, [subMenu, open])

  React.useEffect(
    () =>
      document.addEventListener(
        'keydown',
        (e) => e.key === 'Escape' && Toggle()
      ),
    []
  )

  const Toggle = () => {
    setOpen((open) => !open)
    setSubMenu('main')
    setQuery('')
  }

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setQuery(e.currentTarget.value)
  }

  let Main: S.Option[] = [
    {
      icon: FaNewspaper,
      text: 'New Snip',
      href: true,
      url: '/',
    },
    {
      icon: FaEdit,
      text: 'Edit Snip',
      href: false,
      onClick: () => router.push(`/edit/${snip.slug}`)!,
      perms: true,
    },
    {
      icon: FaTrash,
      text: 'Delete Snip',
      href: false,
      onClick: () => router.push(`/edit/${snip.slug}`)!,
      perms: true,
    },
    {
      icon: FaCopy,
      text: 'Copy Snip',
      href: false,
      onClick: () => {
        copyToClipboard(snip.content)
      },
    },
    {
      icon: FaShare,
      text: 'Copy Link',
      href: false,
      onClick: () => copyToClipboard(window.location.href),
    },
    {
      icon: FaDownload,
      text: 'Download Snip',
      href: true,
      url: `data:application/octet-stream,${encodeURIComponent(snip.content)}`,
    },
    {
      icon: session?.user ? FaUser : FaGithub,
      text: session?.user ? 'View Snips' : 'Login With GitHub',
      href: false,
      onClick: () => (session?.user ? setSubMenu('snips') : signIn('github')),
    },
    {
      icon: session?.user ? FaSignOutAlt : FaGitlab,
      text: session?.user ? 'Logout' : 'Login With GitLab',
      href: false,
      onClick: () => (session?.user ? signOut() : signIn('gitlab')),
    },
    {
      icon: FaCode,
      text: 'API',
      href: true,
      url: '/api',
    },
    {
      icon: FaCodeBranch,
      text: 'GitHub Repository',
      href: true,
      url: 'https://github.com/harshhhdev/snipbin',
    },
    {
      icon: FaInfoCircle,
      text: 'About',
      href: true,
      url: '/abt',
    },
  ]
  if (user === undefined) Main = Main.filter((option) => !option.perms)
  const filteredResults = S.filter(Main, query)

  const userSnips: S.Option[] | undefined = snips?.map((snip) => ({
    icon: FaLink,
    text: `/${snip.slug}`,
    href: true,
    url: `/${snip.slug}`,
  }))
  const filteredSnips = S.filter(userSnips, query)

  return (
    <>
      {open && (
        <S.Container role='dialog' aria-modal='true'>
          <S.Palette>
            {subMenu === 'main' && (
              <S.Options ref={parentRef}>
                <S.SearchContainer>
                  <FaSearch />
                  <S.SearchInput
                    placeholder='Type to Search...'
                    spellCheck='false'
                    ref={inputRef}
                    onChange={changeHandler}
                  />
                </S.SearchContainer>
                {filteredResults?.map((option, index) =>
                  option.href ? (
                    <S.Option key={index} href={option.url} rel='norefferer'>
                      <option.icon />
                      {option.text}
                    </S.Option>
                  ) : (
                    <S.Option key={index} href='#' onClick={option.onClick}>
                      <option.icon />
                      {option.text}
                    </S.Option>
                  )
                )}
              </S.Options>
            )}
            {subMenu === 'snips' && (
              <S.Options>
                <S.SearchContainer>
                  <FaSearch />
                  <S.SearchInput
                    placeholder='Type to Search...'
                    spellCheck='false'
                    ref={inputRef}
                    onChange={changeHandler}
                  />
                </S.SearchContainer>
                <S.Option onClick={() => setSubMenu('main')} href='#'>
                  <FaAngleLeft /> Back
                </S.Option>
                {filteredSnips?.map((snip, index) => (
                  <S.Option key={index} href={snip.url}>
                    <FaLink /> {snip.text}
                  </S.Option>
                ))}
              </S.Options>
            )}
          </S.Palette>
        </S.Container>
      )}
    </>
  )
}

export default Palette
