'use client'

import { useTransit } from '~/hooks/use-transit'

export const Transit = () => {
  const { data } = useTransit()
  console.log(data)

  return <></>
}
