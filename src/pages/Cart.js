import React,{ useState, useEffect} from 'react';
import firebase from "../firebase";
import {useGlobalContext} from '../context'

const Cart = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState('')
  const {user} = useGlobalContext()

  const ref = firebase.firestore().collection("users")

  const getData = async () =>{
    setLoading(true)
    ref.onSnapshot((querySnapshot)=>{
      const items = []
      // console.log(querySnapshot)
      querySnapshot.forEach((doc) =>{
        items.push(doc.data())
      })
      if(items.length > 0){
        setData(items)
        setLoading(false)
      }else{
        setData([])
        setLoading(false)
      }
    })
  }

  // const getData2 = () => {
  //   setLoading(true)
  //   ref.get()
  //     .then((item) =>{
  //       console.log(item.docs)
  //       const items = item.docs.map((doc) => doc.data())
  //       setData(items)
  //       setLoading(false)
  //     })
  //     .catch((error) =>{
  //       console.log(error)
  //     })
  // }

  useEffect(() =>{
    getData()
    // console.log(data)
  },[])


  // const cocktail = {
  //   id: new Date().getTime().toString(),
  //   title: "cocktail4",
  //   alcohol: false,
  //   description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, quaerat?'
  // }


  const addCocktail = (newCocktail) =>{
    ref
      .doc(newCocktail.id)
      .set(newCocktail)
      .catch((error) => console.log(error))
  }

  const deleteCocktail = (cocktail) =>{
    console.log(cocktail.id)
    ref
      .doc(cocktail.id)
      .delete()
      .catch((error) => console.log(error))
  }

  
  if(loading){
    return <h2>Loading...</h2>
  }

  const editCocktail = (user) =>{
    ref
      .doc(user.id)
      .update(user)
      .catch((error) => console.log(error))
  }

  const user1 = {
    // id:'1620466073113',
    name: 'TieuDe',
    email: 'tieude@min.com',
    googleId:'',
    favorite: ['17222','13501'],
    password: 'tieude123'
  }


  return (
    <div>
      <button onClick={()=>{addCocktail(user1)}} className='btn'>update user</button>
      {
        data.map((item, index) =>{
          if(item.id === user.id){
            return(
              <div key={index}>
                <h2>name: {item.name}</h2>
                <p>id: {item.id}</p>
                <p>email: {item.email}</p>
                <div>
                  {
                    item.favorite.map((fa, index) =>{
                      return <p key={index}>{fa}</p>
                    })
                  }
                </div>
                <div className="btn-container">
                  <button onClick={() => deleteCocktail(item)} className="btn">delete</button>
                  <button onClick={() => editCocktail({
                    favorite: ['17222','17837','14610']
                  })} className="btn">edit</button>
                </div>
              </div>
            )
          }
        })
      }
    </div>
  );
};

export default Cart;



// const Checkbox = React.memo(({ value, onClick }) => {
//   console.log('Checkbox is renderd!');
//   return (
//     <div style={{ cursor: 'pointer' }} onClick={onClick}>
//       {value ? '☑' : '□'}
//     </div>
//   );
// });


// export default App
