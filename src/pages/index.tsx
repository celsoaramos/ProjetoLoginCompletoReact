import { useAuthContext } from '@/contexts/AuthContext'
import Head from 'next/head'
import LoginEnvironment from '@/components/Organisms/LoginEnvironment'
import { BrowserRouter } from 'react-router-dom'
import Layout from '@/components/Organisms/Layout'

export default function Home() {
  1
  const {
    loggedIn,
  } = useAuthContext()

  return (
    <>
      <Head>
        <title>Gestão de Pacientes Clínicos</title>
      </Head>

      {loggedIn ? (
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      ) : (
        <LoginEnvironment />
      )}
    </>
  )
}

