export default (to, from, next) => {
  let token = localStorage.getItem('UserToken')
  if(token) {
    next()
  }else {
    next('/signin')
  }
}