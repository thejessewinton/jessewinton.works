import dayjs from 'dayjs'
import { groupBy, sortBy } from 'remeda'
import { allExperiences } from '~/contentlayer'

export const getAllExperience = () => {
  const all = groupBy(allExperiences, (x) => dayjs(x.startDate).year())
  return sortBy(Object.entries(all), ([year]) => -year)
}
