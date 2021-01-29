import Layout from '../components/layout'

function AboutPage() {
  return (
    <Layout>
      <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
        <div className="space-y-6 md:w-1/2">
          <div>
            <h2 className="mb-3 text-xl font-bold">What is this app?</h2>
            <p>This app allows you to explore points of interest in Berlin</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
