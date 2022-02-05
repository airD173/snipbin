import { initRateLimit, CountFn } from './rateLimit'
import getIP from './getIP'
import { upstashRest } from './upstash'

export const ipRateLimit = initRateLimit((request) => ({
  id: `ip:${getIP(request)}`,
  count: increment,
  limit: 5,
  timeframe: 10,
}))

const increment: CountFn = async ({ key, timeframe }) => {
  const results = await upstashRest(
    [
      ['INCR', key],
      ['EXPIRE', key, timeframe],
    ],
    { pipeline: true }
  )
  return results[0].result
}
