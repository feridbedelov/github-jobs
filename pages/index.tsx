import { useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import Job from '../src/components/JobItem'
import { useJobs } from "../src/hooks/useJobs"
import { JobModel } from "../src/models/models"
import JobPagination from '../src/components/JobPagination'
import SearchForm from '../src/components/SearchForm'


export interface IParams {
  description: string;
  location: string;
}


export default function Home() {

  const [params, setParams] = useState<IParams>({ description: '', location: '' })
  const [page, setPage] = useState<number>(1)

  const { jobs, loading, error, hasNext } = useJobs(params, page)

  function handleParamsChange(e: any): void {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }


  return (

    <Container>
      <h1 className="my-4 display-4">Github Jobs</h1>
      <SearchForm handleParamsChange={handleParamsChange} params={params} />
      <JobPagination page={page} hasNext={hasNext} setPage={setPage} />

      {loading && (<div style={{ minHeight: "50vh", display: "flex", justifyContent: 'center', alignItems: "center" }} >
        <Spinner animation="border" />
      </div>)}

      {error && <h1>{error}</h1>}

      {jobs?.map((job: JobModel) => <Job key={job.id} job={job} />)}

      <JobPagination page={page} hasNext={hasNext} setPage={setPage} />

    </Container>

  )
}
