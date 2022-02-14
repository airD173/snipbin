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
  FaClone,
  FaBan,
  FaCheck,
  FaScroll,
} from 'react-icons/fa'
import { Snip as SnipType, User } from '.prisma/client'
import { DeleteSnip } from '@components/Edit/Palette'

const Palette: React.FC<{
  snip: SnipType
  snips: SnipType[] | undefined
  user: User | undefined
}> = ({ snip, snips, user }) => {
  const [open, setOpen] = React.useState(false)
  const [subMenu, setSubMenu] = React.useState('main')

  const [copied, setCopied] = React.useState(false)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const [query, setQuery] = React.useState('')

  const parentRef = useArrowKeys({ selectors: 'a,input' })

  const { data: session, status } = useSession()
  const router = useRouter()

  React.useEffect(() => {
    if (open && subMenu === 'main') inputRef.current!.focus()
    else if (open && subMenu === 'snips') inputRef.current!.focus()
  }, [subMenu, open])

  React.useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey && e.key === 'p') || e.key === 'Escape') {
        e.preventDefault()
        Toggle()
      }

      if (e.ctrlKey && e.key === 'e') {
        e.preventDefault()
        user === undefined
          ? router.push(`/${snip.slug}/clone`)
          : router.push(`/edit/${snip.slug}`)
      }

      if (e.ctrlKey && e.key === 'm') {
        e.preventDefault()
        router.push('/')
      }
    })

    document.addEventListener('click', (e) => {
      if (e.target instanceof Element && e.target.id === 'dialogue') Toggle()
    })
  }, [])

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
      icon: FaClone,
      text: 'Clone Snip',
      href: false,
      onClick: () => router.push(`/${snip.slug}/clone`)!,
      perms: true,
    },
    {
      icon: FaTrash,
      text: 'Delete Snip',
      href: false,
      onClick: () => setSubMenu('delete'),
      perms: true,
    },
    {
      icon: FaCopy,
      text: copied ? 'Copied!' : 'Copy Snip',
      href: false,
      onClick: () => {
        setCopied(true)
        copyToClipboard(snip.content)

        setTimeout(() => setCopied(false), 2000)
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
      url: '/api-docs.md',
    },
    {
      icon: FaCodeBranch,
      text: 'GitHub Repository',
      href: true,
      url: 'https://github.com/harshhhdev/snipbin',
    },
    {
      icon: FaScroll,
      text: 'Guide',
      href: true,
      url: '/guide.md',
    },
    {
      icon: FaInfoCircle,
      text: 'About',
      href: true,
      url: '/abt.md',
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
        <S.Container role='dialog' aria-modal='true' id='dialogue'>
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
            {subMenu === 'delete' && (
              <S.Options ref={parentRef}>
                <S.Option header>
                  Would you like to delete this paste? This action is
                  irreversible
                </S.Option>
                <S.Option onClick={() => setSubMenu('main')} href='#'>
                  <FaBan /> Cancel
                </S.Option>
                <S.Option
                  onClick={() => DeleteSnip(snip.slug, router)}
                  href='#'
                >
                  <FaCheck /> Confirm
                </S.Option>
              </S.Options>
            )}
          </S.Palette>
        </S.Container>
      )}
    </>
  )
}

export default Palette
