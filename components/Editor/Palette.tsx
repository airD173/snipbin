import React from 'react'

import * as S from '../Palette.style'

import { nanoid } from 'nanoid'
import { hash } from 'bcryptjs'
import axios, { AxiosRequestConfig } from 'axios'

import useArrowKeys from 'react-arrow-key-navigation-hook'

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
  FaLink,
  FaAngleLeft,
  FaTerminal,
  FaScroll,
} from 'react-icons/fa'

import { Snip as SnipType } from '.prisma/client'
import DetectLang from '@lib/DetectLang'

const Palette: React.FC<{
  content: string
  snips: SnipType[] | undefined
}> = ({ content, snips }) => {
  const [open, setOpen] = React.useState(false)
  const [subMenu, setSubMenu] = React.useState('slug')

  const [slug, setSlug] = React.useState('')
  const slugRef = React.useRef<HTMLInputElement>(null)

  const [password, setPassword] = React.useState('')
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

  React.useEffect(() => {
    if (open && subMenu === 'main') inputRef.current!.focus()
    else if (open && subMenu === 'encrypt') encryptRef.current!.focus()
    else if (open && subMenu === 'slug') slugRef.current!.focus()
  }, [subMenu, open])

  React.useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey && e.key === 'p') || e.key === 'Escape') {
        e.preventDefault()
        Toggle()
      }

      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        console.log(content)
        // CreateSnip(slug === '' || null ? nanoid(5) : slug)
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

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setQuery(e.currentTarget.value)
  }

  const Back = () => {
    setSubMenu('main')
    setQuery('')
  }

  const CreateSnip = async (slug: string) => {
    const language = await DetectLang(content)

    password !== ''
      ? await hash(password, 10, async (err, hash) => {
          await axios.post('/api/new', {
            content: content,
            slug: slug,
            password: hash,
            language: language.data.data,
          })
        })
      : await axios.post('/api/new', {
          content: content,
          slug: slug,
          language: language,
        })

    router.push(`/${slug}`)
  }

  const Main: S.Option[] = [
    {
      icon: FaNewspaper,
      text: 'Save Snip',
      href: false,
      onClick: () => CreateSnip(slug === '' || null ? nanoid(5) : slug),
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
      {!open && (
        <S.MobileToggle onClick={Toggle}>
          <FaTerminal size={25} />
        </S.MobileToggle>
      )}
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
                    <S.Option key={index} onClick={option.onClick} href='#'>
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
                  defaultValue={password}
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
