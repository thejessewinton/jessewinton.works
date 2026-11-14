import { Link } from '@tanstack/react-router'

export const NotFound = () => {
  return (
    <div className="flex flex-col">
      <span className="block uppercase">Jesse Winton</span>
      <span className="uppercase tabular-nums">404 ~ Not Found</span>
      <Link to="/" className="mt-20">
        Go home
      </Link>
    </div>
  )
}
