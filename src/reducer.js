const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAVORITE':
      console.log(action.payload)
      return {
        ...state,
        favorite: action.payload
      }
    case 'ADD_FAVORITE':
      // const exist = false
      // const newFav = state.favorite.map((id, index) => {
      //   if(action.payload === id){
      //     state.favorite.splice(index, 1)
      //     exist = true
      //   }
      // })
      // console.log(newFav)
      // const fetchFv = () =>{
      //   if(exist) return newFav
      //   else{
      //     return [...state.favorite, action.payload]
      //   } 
      // }
      const newFav = [...state.favorite, action.payload]
      return {
        ...state,
        favorite: newFav
      };
    default:
      return state;
  }
};

export default reducer


