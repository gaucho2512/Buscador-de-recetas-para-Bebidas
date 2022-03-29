import {useState , createContext, useEffect} from 'react'
import axios from 'axios'

const BebidasContext = createContext()

const BebidasProvider = ({children}) => {

    const [cargando , setCargando] = useState(false)
    const [bebidaId , setBebidaId] = useState(null)
    const [modal , setModal] = useState(false)
    const [bebidas , setBebidas] = useState([])
    const [receta , setReceta] = useState({})

    useEffect(() => {
      setCargando(true)
      const obtenerReceta = async () => {
          if(!bebidaId) return
          try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
            const {data} = await axios(url)
            setReceta(data.drinks[0]); 
          } catch (error) {
            console.log(error);
          } finally {
            setCargando(false)
          }
      }
      obtenerReceta()
    },[bebidaId])

    const handleModalClick = () => {
        setModal(!modal)
    }

    const handleBebidaIdClick = (id) => {
        setBebidaId(id)
    }

    const consultarBebidas = async (datos) => {
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`
            const {data} = await axios(url)
            setBebidas(data.drinks);
        } catch (error) {
            console.log(error);
        }
    }
  

  return (
        <BebidasContext.Provider
          value={{
            consultarBebidas,
            bebidas,
            handleModalClick,
            modal,
            handleBebidaIdClick,
            receta,
            cargando
          }}
        >
             {children}
        </BebidasContext.Provider>
  )
}

export {BebidasProvider}
export default BebidasContext