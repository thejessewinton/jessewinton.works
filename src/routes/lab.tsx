import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/lab')({
  component: Lab,
})

function Lab() {
  return <div>LAB</div>
}
