import React,{useEffect} from 'react';
import {useGlobalContext} from '../context'


const SearchForm = () => {
  const searchValue = React.useRef('')
  const {setSearchTerm} = useGlobalContext()


  useEffect(() => {
    searchValue.current.focus()
  }, []);


  return (
    <section className='section search'>
      <form className="search-form">
        <div className="form-control">
          <label htmlFor="name"> search your favorite cocktail</label>
          <input 
            type="text" 
            name='name' 
            id='name'
            ref={searchValue}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
    </section>
  );
};


export default SearchForm;