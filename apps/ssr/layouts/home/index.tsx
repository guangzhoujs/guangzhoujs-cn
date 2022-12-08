import Navbar from './Navbar'
import Footer from '../common/Footer'

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
