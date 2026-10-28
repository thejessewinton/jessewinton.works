import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Clock } from '~/components/ds/clock'
import { site } from '~/data/site'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="m-0 max-w-110">
      <div className="flex flex-col">
        <span className="block uppercase">Jesse Winton</span>
        <span className="block uppercase">
          {site.now.title} ~{' '}
          <Link to={site.now.url} target="_blank" className="hover:underline">
            {site.now.company}
          </Link>
        </span>
        <span className="block uppercase">
          NYC ~ <Clock />
        </span>
      </div>

      <div className="mt-20">
        <span>{site.bio}</span>
      </div>

      <div className="mt-20 flex flex-col">
        {site.connections.map((connection) => {
          return (
            <span key={connection.title} className="w-fit hover:underline">
              [{connection.title}]
              <Link to={connection.url} key={connection.title} target="_blank">
                ({`/${connection.url.split('/').pop()}`})
              </Link>
            </span>
          )
        })}
      </div>
    </div>
  )
}
