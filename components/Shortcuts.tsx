import React from 'react'
import { styled } from '@css/theme.config'

const NotificationLink = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  right: 0,
  left: 0,
  bottom: 40,
  userSelect: 'none',
  textDecoration: 'none',
})

const NotificationContent = styled('a', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: 20,
  borderRadius: 5,
  background: '#393E45',
  boxShadow: '0px 0px 50px 10px #0000002f',
  textDecoration: 'none',
  transition: '0.1s linear',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
})

const NotificationText = styled('p', {
  color: '$white10',
  fontSize: '$1',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  variants: {
    margin: {
      true: {
        marginTop: 10,
      },
    },
  },
})

const Key = styled('div', {
  fontSize: 12,
  padding: 5,
  width: 'fit-content',
  background: '#4d525a',
  margin: '0px 3px 0px 0px',
  borderRadius: 5,
})

const Shortcuts: React.FC<{ edit: boolean }> = ({ edit }) => {
  return (
    <NotificationLink>
      <NotificationContent href='/guide.md' draggable='false'>
        {edit ? (
          <NotificationText>
            <Key>ctrl+s</Key> to save, <Key>ctrl+m</Key> for a new paste
          </NotificationText>
        ) : (
          <NotificationText>
            <Key>ctrl+m</Key> for a new paste, <Key>ctrl+e</Key> to edit
          </NotificationText>
        )}
        <NotificationText margin>
          <Key>esc/ctrl+p</Key> for command palette
        </NotificationText>
      </NotificationContent>
    </NotificationLink>
  )
}

export default Shortcuts
