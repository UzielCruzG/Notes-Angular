import { List } from "../list-component/list.model"

export interface User{
  _id: string,
  username:string,
  email: string,
  password: string,
  lists: [List]
}
