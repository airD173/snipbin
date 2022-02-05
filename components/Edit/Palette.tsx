import React from 'react'

import * as S from '../Palette.style'

import { Snip as SnipType } from '.prisma/client'

import { useDetectClickOutside } from 'react-detect-click-outside'
import useArrowKeys from 'react-arrow-key-navigation-hook'
import axios from 'axios'

import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'

import {
  FaSearch,
  FaLock,
  FaGithub,
  FaGitlab,
  FaCode,
  FaCodeBranch,
  FaInfoCircle,
  FaPen,
  FaTimes,
  FaCheck,
  FaNewspaper,
  FaSignOutAlt,
  FaUser,
  FaSave,
  FaTrash,
  FaAngleLeft,
  FaLink,
} from 'react-icons/fa'

const Palette: React.FC<{
  snip: SnipType
  content: string
  snips: SnipType[]
}> = ({ snip, content, snips }) => {
  const [open, setOpen] = React.useState(false)
  const [subMenu, setSubMenu] = React.useState('main')

  const [slug, setSlug] = React.useState(snip.slug)
  const slugRef = React.useRef<HTMLInputElement>(null)

  const [password, setPassword] = React.useState(snip.password)
  const encryptRef = React.useRef<HTMLInputElement>(null)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const [query, setQuery] = React.useState('')

  const { data: session, status } = useSession()
  const router = useRouter()

  const Toggle = () => {
    setOpen((open) => !open)
    setSubMenu('main')
    setQuery('')
  }

  const parentRef = useArrowKeys({ selectors: 'a,input' })
  const boundary = useDetectClickOutside({ onTriggered: Toggle })

  React.useEffect(() => {
    if (open && subMenu === 'main') inputRef.current!.focus()
    else if (open && subMenu === 'encrypt') encryptRef.current!.focus()
    else if (open && subMenu === 'slug') slugRef.current!.focus()
  }, [subMenu, open])

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setQuery(e.currentTarget.value)
  }

  const Back = () => {
    setSubMenu('main')
    setQuery('')
  }

  const EditSnip = () => {
    axios
      .post('/api/edit', {
        content: content,
        slug: slug,
        password: password,
      })
      .then(() => router.push(`/${slug}`))
  }

  const Main: S.Option[] = [
    {
      icon: FaNewspaper,
      text: 'New Snip',
      href: true,
      url: '/',
    },
    {
      icon: FaSave,
      text: 'Save Snip',
      href: false,
      onClick: () => EditSnip(),
    },
    {
      icon: FaTrash,
      text: 'Delete Snip',
      href: false,
      onClick: () => console.log('deleted'),
    },
    {
      icon: FaLock,
      text: 'Encrypt Snip',
      href: false,
      onClick: () => setSubMenu('encrypt')!,
    },
    {
      icon: FaPen,
      text: 'Custom Slug',
      href: false,
      onClick: () => setSubMenu('slug')!,
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
          <S.Palette ref={parentRef}>
            {subMenu === 'main' && (
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
            {subMenu === 'encrypt' && (
              <S.Options ref={parentRef}>
                <S.InputOption
                  placeholder='Snip password...'
                  spellCheck='false'
                  ref={encryptRef}
                  defaultValue={password!}
                />
                <S.Option
                  onClick={() => {
                    setPassword(encryptRef.current!.value)
                    Back()
                  }}
                  href='#'
                >
                  <FaCheck /> Confirm
                </S.Option>
                <S.Option onClick={Back} href='#'>
                  <FaTimes /> Cancel
                </S.Option>
              </S.Options>
            )}
            {subMenu === 'slug' && (
              <S.Options ref={parentRef}>
                <S.InputOption
                  placeholder='Custom slug...'
                  spellCheck='false'
                  ref={slugRef}
                  defaultValue={slug}
                />
                <S.Option
                  onClick={() => {
                    setSlug(slugRef.current!.value)
                    Back()
                  }}
                  href='#'
                >
                  <FaCheck /> Confirm
                </S.Option>
                <S.Option onClick={Back} href='#'>
                  <FaTimes /> Cancel
                </S.Option>
              </S.Options>
            )}
            {subMenu === 'snips' && (
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
