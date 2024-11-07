import { createQuery } from '@tanstack/solid-query'
import { QueryBoundary } from '~/components/QueryBoundary'
import { getSessionQueryOptions } from '~/features/signIn/actions'
import { EditUserForm } from './EditUserForm'

export const EditUserFormWrapper = () => {
  const getSessionQuery = createQuery(getSessionQueryOptions)

  return (
    <QueryBoundary query={getSessionQuery}>
      {({ user }) => <EditUserForm initialValues={{ name: user.name }} />}
    </QueryBoundary>
  )
}
