import {store}  from '../store'

export default(to,from,next)=>{
  if(store.state.token !==null && store.state.token !== undefined){
    next();
  }else{
    next('/');
  }
}
