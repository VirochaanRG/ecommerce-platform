import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () =>
{
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const submitHandler = (e) =>
  {
    e.preventDefault()
    if (keyword.trim())
    {
      navigate(`/search/${keyword}`)
    } else
    {
      navigate('/')
    }
  }

  return (
    <div>
      <Form onSubmit={submitHandler} inline className='search'>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products...'
          className='mr-sm-2 ml-sm-5 '
        ></Form.Control>
        <Button type='submit' variant='outline-success' className='searchbox'>
          Search
        </Button>
      </Form>
    </div>

  )
}

export default SearchBox