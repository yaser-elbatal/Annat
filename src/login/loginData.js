import axios from 'axios';
import { createHashHistory } from 'history'

//  let sleep = (ms) => {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }

let login = async (userData) => {


    
    let user = await axios({
        method: 'post',
        url: `http://68.183.67.204:3000/login`,
        data: userData,
      headers: {
        'content-type': `application/json`,
      },
    });
    console.log(user);

// await sleep(3000)

  return user;
}
   
let isAuth = () => {
   console.log(sessionStorage);
  if (!sessionStorage.getItem("AnnatLogin") || sessionStorage.getItem("AnnatLogin") == "null") {
    this.props.history.push('/login')
    // let history = createHashHistory()
    // history.push('/login');
  }
}


let authed = () => {
  if (localStorage.getItem("AnnatLogin")  && localStorage.getItem("AnnatLogin") != "null"){
    let history = createHashHistory()
    history.push('/dashboard');
  }
}

let logout = ()=>{
  localStorage.removeItem("AnnatLogin")
  // sessionStorage.removeItem("mawadLogin")

  let history = createHashHistory()
  history.push('/login')
  //redirect
  // this.props.history.push('/login')
}

export {login, logout, authed, isAuth}
