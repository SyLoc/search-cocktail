export const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING_DATA':
      const getData = () =>{
        let dataStore = localStorage.getItem('data')
        if(dataStore){
          return (dataStore = JSON.parse(localStorage.getItem('data')))
        }else{
          return []
        }
      }
      return {
        ...state,
        data: getData()
      }
    case 'ADD_ITEM':
      const newItem = [...state.data, action.payload]
      return {
        ...state,
        data:newItem,
        isShowNotice:true,
        content: 'add item'
      }
    case 'NO_VALUE':
      return{
        ...state,
        isShowNotice: true,
        content: 'enter value'
      }
    case 'OFF_SHOW':
      return {
        ...state,
        isShowNotice:false,
        content:''
      }
    case 'CLEAR_ALL':
      return {
        ...state,
        data:[],
        isShowNotice: true,
        content:'deleted all'
      }
    case 'CHANGE_VALUE':
      return{
        ...state,
        data: action.payload,
        isEditing: false,
        isShowNotice: true,
        content:'changed'
      }
    case 'REMOVE':
      const newArray = state.data.filter((item) => item.id !== action.payload)
      return {
        ...state,
        data: newArray,
        isShowNotice: true,
        content:'deleted'
      }
    default:
      return state;
  }
};