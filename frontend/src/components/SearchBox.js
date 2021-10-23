import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {

    const [keywords, setKeywords] = useState("");


    const searchHandler = (e) => {
        e.preventDefault();

        if (keywords) {
            history.push(`/keywords/${keywords}`)

        } else {
            history.push("/")
        }
    }


    return (
        <Form onSubmit={searchHandler} inline className="m-auto">
            <Form.Group controlId="serchbox">
                <Form.Control
                    type="text"
                    placeholder="Search Products ..."
                    value={keywords}
                    onChange={e => setKeywords(e.target.value)}
                />
            </Form.Group>
            <Button type="submit" variant="info" className="m-3">Search</Button>
        </Form>
    )
}

export default SearchBox
