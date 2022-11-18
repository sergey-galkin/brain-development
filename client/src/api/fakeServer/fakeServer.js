import store from "../../app/store";
import { login } from "../../components/features/Header/DropDownMenu/authSlice";
import { addUser, selectAllUsers, selectUserById } from "./usersSlice";

export const createUser = (regData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = selectAllUsers(store.getState())
      
      if (!isUnique(users, regData, 'login')) {
        resolve({status: false, notUnique: 'login'});
        return;
      }

      if (!isUnique(users, regData, 'email')) {
        resolve({status: false, notUnique: 'email'});
        return;
      }

      store.dispatch(addUser(regData))
      resolve({status: true})
    }, 500)
  });
}

export const authentication = (authData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = selectUserById(store.getState(), authData.login)
      
      if (!user) {
        resolve({status: false})
        return;
      }
      if (authData.password !== user.password) {
        resolve({status: false});
        return;
      }

      store.dispatch(login(authData))
      resolve({status: true})
    }, 500)
  });
}

function isUnique(users, regData, prop) {
  return !users.filter((u => u[prop].toLowerCase() === regData[prop].toLowerCase())).length
}