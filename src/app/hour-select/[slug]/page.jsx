import React from 'react'
import Form from 'react-bootstrap/Form';
import "./hour.css"


const page = () => {
  return (
    <div className='d-flex my-4 py-5 justify-content-center'>
        <Form.Select size="lg">
        <option>1 hour</option>
        <option>2 hour</option>
      </Form.Select>
       
    </div>
  )
}

export default page
