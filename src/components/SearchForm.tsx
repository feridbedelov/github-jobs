import React from 'react'
import { Col, Form, FormControlProps } from 'react-bootstrap'

export interface IFormProps {
    params: {
        description: string;
        location: string;
    };
    handleParamsChange: (e: any) => void;
}

function SearchForm({ params, handleParamsChange }: IFormProps) {
    return (
        <Form className='mb-4'>
            <Form.Row className="align-items-end">
                <Form.Group as={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        onChange={handleParamsChange}
                        name="description"
                        value={params.description}
                        type="text" />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        onChange={handleParamsChange}
                        name="location"
                        value={params.location}
                        type="text" />
                </Form.Group>
            </Form.Row>
        </Form >
    )
}

export default SearchForm
