import React, { Dispatch, SetStateAction } from 'react'
import { Pagination } from 'react-bootstrap'

export interface IJobPaginationProps {
    page: number;
    hasNext: boolean;
    setPage: Dispatch<SetStateAction<number>>;
}

function JobPagination({ page, hasNext, setPage }: IJobPaginationProps) {


    const adjustPage = (amount: number): void => {
        setPage(prev => prev + amount)
    }

    return (
        <Pagination>
            { page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}
            {page !== 1 && <Pagination.Item onClick={() => setPage(1)} >1</Pagination.Item>}
            {page > 2 && <Pagination.Ellipsis />}
            { page > 2 && <Pagination.Item onClick={() => adjustPage(-1)}>{page - 1}</Pagination.Item>}
            <Pagination.Item active>{page}</Pagination.Item>
            {hasNext && <Pagination.Item onClick={() => adjustPage(1)} >{page + 1}</Pagination.Item>}
            { hasNext && <Pagination.Next onClick={() => adjustPage(1)} />}
        </Pagination>
    )
}

export default JobPagination
