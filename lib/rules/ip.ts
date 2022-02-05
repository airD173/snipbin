import type { NextRequest } from 'next/server'
import { upstashRest } from '@lib/upstash'
import getIP from '@lib/getIP'
import { IP_RULES } from './constants'

export async function blockedIp(request: NextRequest) {
  try {
    const { result } = await upstashRest(['HGET', IP_RULES, getIP(request)])

    if (!result) return false

    const data = JSON.parse(result)

    return data.action === 'block'
  } catch (err) {
    console.error('IP validation failed:', err)
    return false
  }
}
