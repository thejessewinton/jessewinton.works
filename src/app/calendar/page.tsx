import { redirect } from 'next/navigation'
import { Calendar } from '~/components/lab/calendar'

export default function CalendarPage() {
  if (process.env.NODE_ENV !== 'development') {
    redirect('/')
  }

  return <Calendar />
}
