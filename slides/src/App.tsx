import { Section } from './components/Section'

function App() {
  return (
    <div className="h-screen overflow-y-scroll snap-y scrollbar-hide">
      <Section id="home">
        <h1 className="text-6xl font-bold text-primary text-center">
          Homelabbing Workshop
        </h1>
      </Section>
      <Section id="test">
        <h1 className="text-4xl font-bold text-secondary text-center">
          Test Section
        </h1>
      </Section>
    </div>
  )
}

export default App
