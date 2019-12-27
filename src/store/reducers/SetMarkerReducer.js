
const initstate={
    searchvalue: '', works: [],contents: ['Mirististica', 'Vet']
}

const setMarkerReducer = (state=initstate ,action) => {
    
    switch(action.type)
    {
      case 'SETMARKET':
      console.log('SETMARKET',action.location)
      return state
      case 'SETMARKET_ERROR':
        console.log('ERROR',action.location)
        return state
      default:
      return state;
    }
}

export default setMarkerReducer ;