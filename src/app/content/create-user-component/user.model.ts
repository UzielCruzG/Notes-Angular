import { List } from "../list-component/list.model"

export interface User{
  id: string
  username:string
  email: string
  password: string
  image_path: string
  lists: [List]
}
