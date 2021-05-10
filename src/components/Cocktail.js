import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useGlobalContext} from '../context'
import {FaHeart} from 'react-icons/fa'

const Cocktail = ({id, name, image, info, glass}) => {
  const {checkLogin,userInfo,user} = useGlobalContext()
  const [love, setLove] = useState(false)
  const fav = []

  useEffect(()=>{
    const getFav = () =>{
      userInfo.forEach(item => {
        if(item.id === user.id){
          item.favorite.forEach(e =>{
            fav.push(e)
          });
        } 
      })
    }
    getFav()
  },[])


  useEffect(() => {
    const getLove = (arr) =>{
      arr.forEach(i => {
        if(i === id) setLove(true)
      });
    }
    getLove(fav)
  }, []);

  const handleLove = (id) =>{
    console.log(id)
    setLove(!love)
  }

  return (
    <article className='cocktail'>
      <div className="img-container">
        <img src={image} alt={name}/>
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        <div className="btn-container">
          <Link className='btn btn-primary btn-details' to={`/cocktail/${id}`}>details</Link>
          {
            checkLogin ? <button onClick={() => handleLove(id)} className={`like-icon ${love ? 'favorite': null}`}><FaHeart/></button> : null
          }
        </div>
      </div>
    </article>
  );
};

export default Cocktail;