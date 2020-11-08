import React,{useState} from 'react'
import { Badge, Button, Card, Collapse } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown';
import { JobModel } from '../models/models';

interface JobProps {
    job:JobModel
}

function JobItem({job}:JobProps) {

    const {company,company_logo,created_at,description,how_to_apply,location,title,type} = job

    const [open, setOpen] = useState<boolean>(false);

    return (
        <Card className='mb-4'>
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {title} - <span style = {{wordBreak:"break-all"}} className="text-muted font-weight-light" >{company}</span>
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                            {new Date(created_at).toLocaleDateString()}
                        </Card.Subtitle>
                        <Badge variant="secondary" style = {{wordBreak:"break-all"}} className='mr-2' > {type} </Badge>
                        <Badge variant="secondary" style = {{wordBreak:"break-all"}}> {location} </Badge>

                        <div className='my-2' style={{ wordBreak: 'break-all' }}>
                            <ReactMarkdown>
                                {how_to_apply}
                            </ReactMarkdown>
                        </div>
                    </div>
                    <img alt={company} src={company_logo} className='d-none d-md-block' height='50' />
                </div>

                <Card.Text>
                    <Button variant='primary' onClick={() => setOpen(prev => !prev)}>{open ? "Hide " : "View "} Details </Button>
                </Card.Text>
                <Collapse in = {open}>
                    <div className="mt-4">
                        <ReactMarkdown>
                            {description}
                        </ReactMarkdown>
                    </div>
                </Collapse>

            </Card.Body>
        </Card>
    )
}

export default JobItem
