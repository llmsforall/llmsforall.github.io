import { Route, Routes } from 'react-router-dom'
import Layout from './Layout.jsx'
import Page from './Page.jsx'
import Demo from './Demo.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Page id="home" />} />
        <Route path="demo" element={<Demo />} />
        <Route path="about" element={<Page id="about" />} />
        <Route path="blog" element={<Page id="blog" />} />
        <Route path="blog/millie-1-1" element={<Page id="blog-millie-1-1" />} />
        <Route path="blog/millie-cli" element={<Page id="blog-millie-cli" />} />
        <Route path="millie/cli" element={<Page id="millie-cli" />} />
        <Route path="privacy" element={<Page id="privacy" />} />
        <Route path="terms" element={<Page id="terms" />} />
        <Route path="notices" element={<Page id="notices" />} />
        <Route path="support" element={<Page id="support" />} />
      </Route>
    </Routes>
  )
}
