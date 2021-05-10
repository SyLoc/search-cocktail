import React, {useEffect,useState} from 'react';
import {useGlobalContext} from '../context'
import {Link, useParams} from 'react-router-dom'
import Loading from '../components/Loading'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams()
  const {loading, setLoading, login} = useGlobalContext()
  const [cocktail, setCocktail] = useState(null)

  useEffect(() => {
    const fetchCocktail = async() => {
      setLoading(true)
      try {
        const response = await fetch(`${url}${id}`)
        const data = await response.json()
        if(data.drinks){
          const {
            strDrink, 
            strCategory,
            strAlcoholic,
            strGlass,
            strDrinkThumb,
            strInstructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5
          } = data.drinks[0]
  
          const strIngredient = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5
          ]
  
          const objDrink = {
            name: strDrink,
            category: strCategory,
            info: strAlcoholic,
            glass: strGlass,
            instruction: strInstructions,
            image: strDrinkThumb,
            ingredients:strIngredient
          }
          setCocktail(objDrink)
          setLoading(false)
        }else{
          setCocktail(null)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchCocktail()
  },[id]);

  if(loading){
    return <Loading/>
  }

  if(!cocktail){
    return <h2 className='section-title'>no cocktail to display</h2>
  }

  const {name, category, info, glass, instruction, image, ingredients} = cocktail
  return (
    <section className="section cocktail-section">
      <Link to='/' className='btn btn-primary'>back home</Link>
      <h2 className='section-title'>{name}</h2>
              <div className="drink">
                <img src={image} alt={name}/>
                <div className="drink-info">
                  <p>
                    <span className="drink-data">name: </span>
                    {name}
                  </p>
                  <p>
                    <span className="drink-data">category: </span>
                    {category}
                  </p>
                  <p>
                    <span className="drink-data">info: </span>
                    {info}
                  </p>
                  <p>
                    <span className="drink-data">glass: </span>
                    {glass}
                  </p>
                  <p>
                    <span className="drink-data">instruction: </span>
                    {instruction}
                  </p>
                  <p>
                    <span className="drink-data">ingredients: </span>
                    {
                      ingredients.map((item, index) =>{
                        return item ? <span key={index}>{item}</span>:null
                      })
                    }
                  </p>
                </div>
              </div>
              {login ? <Link className='btn btn-primary'>order</Link> : null}
    </section>
  );
};


export default SingleCocktail;