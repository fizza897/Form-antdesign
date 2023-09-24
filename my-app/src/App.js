import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './views/Layout/Layout'
import Products from "./components/Products/Products"
import Category from './components/Category/Category'
import User from "./components/Users/Users"
import Form from './components/UserForm/UserForm'
import Pratice from './components/Pratice/Pratice'
import TodoApp from './components/TodoApp/TodoApp'
export default function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}/>
      <Route path='/product' element={<Products/>}/>
      <Route path='/category' element={<Category/>}/>
      <Route path='/users' element={<User/>} />
      <Route path='/form' element={<Form/>}/>
      <Route path='/pratice' element={<Pratice/>}/>
      <Route path='/todo' element={<TodoApp/>}/>
    </Routes>
    </>
  )
}