import type { FlowComponent } from 'solid-js'
import { ClientOnly } from '~/components/ClientOnly'
import { Skeleton } from '~/components/Skeleton'
import {
  FitnessProfileSection,
  FitnessProfileSectionSkeleton
} from './components/FitnessProfileSection'
import { ErrorCardFallback, SessionWrapper } from './components/SessionWrapper'
import { UserSection } from './components/UserSection'

export const ProfilePage: FlowComponent = props => (
  <>
    <ClientOnly>
      <SessionWrapper
        loadingFallback={<ProfileLoadingSkeleton />}
        errorFallback={ErrorCardFallback}
      >
        {user => (
          <>
            <UserSection user={user} />
            <FitnessProfileSection userId={user.id} />
          </>
        )}
      </SessionWrapper>
    </ClientOnly>
    {props.children}
  </>
)

const ProfileLoadingSkeleton = () => (
  <>
    <section class="layout-section gap-6">
      <div class="grid grid-cols-4 grid-rows-3 gap-6 max-md:grid-cols-3 max-md:grid-rows-2">
        <Skeleton class="col-span-3 row-span-3 rounded-3xl p-8">
          <div class="flex flex-col gap-2">
            <Skeleton class="min-h-[40px] max-w-[200px]" />
            <Skeleton class="min-h-[28px] max-w-[250px]" />
          </div>
          <div class="mt-10 flex flex-col gap-6">
            <Skeleton class="min-h-[52px]" />
            <Skeleton class="min-h-[52px]" />
          </div>
        </Skeleton>
        <div class="flex flex-1 flex-col gap-6 max-md:col-span-3 max-md:flex-row max-md:flex-wrap md:row-span-3">
          <Skeleton class="flex min-h-[87px] items-center justify-center rounded-3xl p-8">
            <Skeleton class="min-h-[28px]" />
          </Skeleton>
          <Skeleton class="flex min-h-[87px] items-center justify-center rounded-3xl p-8">
            <Skeleton class="min-h-[28px]" />
          </Skeleton>
          <Skeleton class="flex min-h-[87px] items-center justify-center rounded-3xl p-8">
            <Skeleton class="min-h-[28px]" />
          </Skeleton>
        </div>
      </div>
    </section>
    <FitnessProfileSectionSkeleton />
  </>
)
