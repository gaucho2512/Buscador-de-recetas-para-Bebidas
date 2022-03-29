import React from 'react'
import { Card, Col, Button, CardImg } from 'react-bootstrap'
import useBebidas from '../hooks/useBebidas'

const Bebida = ({bebida}) => {

  const { handleModalClick , handleBebidaIdClick } = useBebidas()

  return (
      
      <Col md={6} lg={3}>
          <Card className='mb-4'>
             <CardImg
               variant='top'
               src={bebida.strDrinkThumb}
               alt={bebida.strDrink}
             />

             <Card.Body>
                  <Card.Title> { bebida.strDrink } </Card.Title>
                  <Button
                    variant='warning'
                    className='w-100 mt-2 text-uppercase'
                    onClick={ () => {
                      handleModalClick()
                      handleBebidaIdClick(bebida.idDrink)
                    }}
                    type='submit'
                  >
                     ver receta
                  </Button>
             </Card.Body>
          </Card>
      </Col>

  )
}

export default Bebida