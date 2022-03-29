import {useState} from 'react'
import { Button, Row, Col, Form, FormGroup, FormLabel, FormControl, Alert } from 'react-bootstrap'
import useBebidas from '../hooks/useBebidas'
import useCategorias from '../hooks/useCategorias'



const Formulario = () => {

    const [alerta , setAlerta] = useState('')
    const [busqueda , setBusqueda] = useState({
        nombre: '',
        categoria: ''
    })

    const handleChange = (e) => {
        setBusqueda({
            ...busqueda ,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(Object.values(busqueda).includes('')) {
            setAlerta('Todos los campos son obligatorios')
            return
        }
        setAlerta('')
        consultarBebidas(busqueda)
    }

    const { categorias } = useCategorias()
    const { consultarBebidas } = useBebidas()
   

  return (
      <>
       <Form
        onSubmit={handleSubmit}
       >
           { alerta && <Alert variant='danger' className='text-center'>{alerta}</Alert>}
            <Row>
                <Col md={6}>
                    <FormGroup className='mb-3'>
                        <FormLabel htmlFor='nombre'>Nombre Bebida</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Ej: Tequila , Vodka , Etc.'
                            name='nombre'
                            onChange={handleChange}
                            id='nombre'
                            value={busqueda.nombre}
                        />
                    </FormGroup>
                </Col>

                <Col md={6}>
                <FormGroup className='mb-3'>
                        <FormLabel htmlFor='categoria'>Categoria Bebida</FormLabel>
                        <Form.Select
                            name='categoria'
                            onChange={handleChange}
                            id='categoria'
                            value={busqueda.categoria}
                        > 
                            <option> -Selecciona Categoria- </option>
                            {categorias.map( categoria => (
                                <option
                                   key={categoria.strCategory}
                                   value={categoria.strCategory}>
                                   {categoria.strCategory}
                                </option>
                            ))} 
                        </Form.Select>
                    </FormGroup>
                </Col>
            </Row>

            <Row className='justify-content-end'>
                <Col md={3}>
                   <Button
                     variant='danger'
                     className='text-uppercase w-100'
                     type='submit'
                   >
                       Buscar Bebidas
                   </Button>            
                </Col>
            </Row>
        </Form>
      </>
  )
}

export default Formulario