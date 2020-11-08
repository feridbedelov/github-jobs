import Axios from 'axios'
import { useEffect, useReducer } from 'react'
import { IJobAction, JobState } from '../models/models'

const initalState: JobState = {
    jobs: null,
    loading: false,
    error: null,
    hasNext: false
}



const BASE_URL = "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json"

const reducer = (state: JobState, action: IJobAction) => {
    switch (action.type) {
        case "MAKE_REQUEST":
            return {
                ...state,
                loading: true,
                jobs: [],
                error: null
            }
        case "GET_DATA":
            return {
                ...state,
                loading: false,
                jobs: action.payload,
                error: null
            }
        case "FAILED":
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case "UPDATE_HAS_NEXT":
            return {
                ...state,
                hasNext: action.payload
            }
        default:
            return state
    }
}

export const useJobs = (params: {}, page: number) => {

    const [state, dispatch] = useReducer(reducer, initalState)

    useEffect(() => {
        const cancelToken1 = Axios.CancelToken.source()
        const cancelToken2 = Axios.CancelToken.source()

        dispatch({ type: "MAKE_REQUEST" })

        Axios(BASE_URL, {
            cancelToken: cancelToken1.token,
            params: { markdown: true, page: page, ...params }
        })
            .then((res) => {
                dispatch({ type: "GET_DATA", payload: res.data })
            })
            .catch((e) => {
                if (Axios.isCancel(e)) return
                dispatch({ type: "FAILED", payload: "Something Went Wrong" })
            })


        Axios(BASE_URL, {
            cancelToken: cancelToken2.token,
            params: { markdown: true, page: page + 1, ...params }
        })
            .then((res) => {
                dispatch({ type: "UPDATE_HAS_NEXT", payload: res.data.length !== 0 })
            })
            .catch((e) => {
                if (Axios.isCancel(e)) return
                dispatch({ type: "FAILED", payload: "Something Went Wrong" })
            })

        return () => {
            cancelToken1.cancel()
            cancelToken2.cancel()
        }

    }, [params, page])


    return state
}  