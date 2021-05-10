import React, {useContext, useState, useEffect,useReducer} from 'react';
import firebase from "./firebase";
import reducer from "./reducer"

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const initialState = {
  id:'',
  name: '',
  email: '',
  googleId:'',
  favorite: [],
  password: ''
}

const AppProvider = ({children}) =>{
  const [state, dispatch] = useReducer(reducer, initialState)

  const [loading, setLoading] = useState(false)
  const [cocktails, setCocktails] = useState([])
  const [searchTerm, setSearchTerm] = useState('a')
  const [checkLogin, setCheckLogin] = useState(false)
  const [user, setUser] = useState({id:"", name:"", email:""})
  const [userInfo,setUserInfo] = useState([])

  const ref = firebase.firestore().collection("users")

  useEffect(() =>{
    const fetchData = async() =>{
      setLoading(true)
      try {
        const response = await fetch(`${url}${searchTerm}`)
        const data = await response.json()
        //console.log(data)
        const {drinks} = data
        //console.log(drinks)
        if(drinks){
          const newDrinks = []
          drinks.map((item) =>{
            const {idDrink, strDrink, strGlass, strAlcoholic, strDrinkThumb} = item
            let objData = {
              id: idDrink,
              name: strDrink,
              info:strAlcoholic,
              glass:strGlass,
              image: strDrinkThumb
            }
            newDrinks.push(objData)
          })
          setCocktails(newDrinks)
          setLoading(false)
        }else{
          setCocktails([])
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchData()
  },[searchTerm])

  useEffect(()=>{
    const getUser = async() =>{
      ref.onSnapshot((querySnapshot)=>{
        const items = []
        querySnapshot.forEach((doc) =>{
          items.push(doc.data())
        })
        if(items.length > 0){
          setUserInfo(items)
        }else{
          setUserInfo([])
        }
      })
    }
    getUser()
  },[])

  useEffect(() => {
    const getLogin = () =>{
      let res = localStorage.getItem('login')
      if(res){
        res = JSON.parse(localStorage.getItem('login'))
        setUser(res)
        setCheckLogin(true)
      }else{
        console.log('not login')
      }
    }
    getLogin()
  },[]);


  return (
    <AppContext.Provider value={
      {
        loading,
        cocktails,
        searchTerm,
        setSearchTerm,
        setLoading,
        checkLogin,
        setCheckLogin,
        user,
        setUser,
        state,
        userInfo,
      }
    }>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () =>{
  return useContext(AppContext)
}

export {AppContext, AppProvider}