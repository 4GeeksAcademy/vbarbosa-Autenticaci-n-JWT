export const initialStore=()=>{
  return{
    user: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : null,
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'logout':

      //remove the client token and info from local
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return {
        ...store,
        user: null
      };

    case 'get_user':
      return {
        ...store,
        user: action.payload
      };

    case 'add_user':
      return {
        ...store,
        user: action.payload
      };

    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');
  }    
}
