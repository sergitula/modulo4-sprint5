import Footer from "./components/layout/Footer"
import Navbar from "./components/layout/Navbar"
import { AppRouter } from "./components/routes/AppRouter"

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface font-sans antialiased overflow-x-clip">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AppRouter />
      </main>
      <Footer />
    </div>
  )
}

export default App
