import Image from 'next/image'

import { Expressions } from './_components/Expressions'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Expressions />
    </main>
  )
}
