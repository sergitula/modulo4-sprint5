import Footer from "./components/layout/Footer"
import Navbar from "./components/layout/Navbar"
import { AppRouter } from "./components/routes/AppRouter"

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <AppRouter />
      </main>
      <Footer />
    </div>
  )
}

export default App
