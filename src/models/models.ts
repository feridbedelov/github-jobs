export interface JobModel {
    id: string;
    title: string;
    company: string;
    created_at: string;
    location: string;
    type: string;
    how_to_apply: string;
    company_logo: string;
    description: string;
}

export type IJobAction = { type: "MAKE_REQUEST" } |
{ type: "GET_DATA", payload: JobModel } |
{ type: "FAILED", payload: string } |
{ type: "UPDATE_HAS_NEXT", payload: boolean }

export interface JobState {
    jobs: Array<JobModel>,
    loading: boolean;
    error: string | null;
    hasNext:boolean;
}
