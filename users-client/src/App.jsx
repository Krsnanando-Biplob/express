import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [user, setUser] = useState([])
  const [laptop, setLaptop] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUser(data))
  }, [])

  useEffect(() => {
    fetch('http://localhost:5000/laptop')
      .then(res => res.json())
      .then(data => setLaptop(data))
  }, [])

  const handelfrom = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const name = form.name.value;
    const users = { name, email }
    console.log(users);
    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(users)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newUser = [...user, data]
        setUser(newUser)
        form.reset()
      })
  }
  const handlelaptop = e =>{
    e.preventDefault();
    const from = e.target
    const price = from.price.value;
    const name = from.name.value;
    const laptops = {name, price}
    console.log(laptops)
    fetch('http://localhost:5000/laptop',{
      method: 'post',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(laptops)
    })
    .then(res => res.json())
    .then(data =>{
      const newLaptop = [...laptop, data]
      setLaptop(newLaptop);
      from.reset()
    })

  }

  return (
    <>
      <h1>Users Manesment System</h1>
      <form onSubmit={handelfrom}>
        <input type="text" name='name' /> <br />
        <input type="email" name='email' /> <br />
        <input type="submit" value="Add user" />
      </form>
      <h3>Number of user {user.length} </h3>
      <div>
        {
          user.map(user => <p key={user.id} > {user.id}: {user.name} {user.address}, {user.email} </p>)
        }
      </div>
      <form onSubmit={handlelaptop}>
        <input type="text" name="name" id="" /> <br />
        <input type="text" name="price" id="" /> <br />
        <input type="submit" value="Add laptop" />
      </form>
      <div>
        <h3>Number of Laptop: {laptop.length}</h3>
        {
          laptop.map(laptop => <p key={laptop.id}>{laptop.id}: {laptop.name}, {laptop.price} </p>)
        }
      </div>
    </>
  )
}

export default App
