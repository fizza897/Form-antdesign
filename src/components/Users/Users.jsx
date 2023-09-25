import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Input, Drawer, TextField, Button } from '@mui/material';


function Users() {
    
    const [users, setUsers] = useState([])
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://dummyjson.com/users');
                const result = response.data;
                setUsers(result?.users || []);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    const fetchUser = async (userId) => {
        try {
            const respone = await axios.get(`https://dummyjson.com/users/${userId}`)
            const userData = respone.data
            console.log("productData................", userData)
            alert(`firstName: ${userData.firstName}\nlastName: ${userData.lastName}\nAge: ${userData.age}`);
        } catch (error) {
            console.error('Error fetch User:', error);
        }
    };
    const removeUser = async (userToDelete) => {
        try {
            await axios.delete(`https://dummyjson.com/users/${userToDelete.id}`);
            const updatedUsers = users.filter((user) => user.id !== userToDelete.id);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error remove User:', error);
        }
    };
    const addUser1 = async () => {
        try {
            const response = await axios.post('https://dummyjson.com/users/add', {
                firstName: firstName,
                lastName: lastName,
                age: age,
            });
            const newUser = response.data;
            setUsers((prevUser) => [...prevUser, newUser]);
            setIsDrawerOpen(false);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };
    const searchUser = async () => {
        try {
            const response = await axios.get(`https://dummyjson.com/users/search?q=${searchQuery}`);
            const data = response.data.users;
            setUsers(data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={searchUser} disabled={!searchQuery}>Search</button><br />
                <button onClick={toggleDrawer}>Add User</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '1rem' }}>
                {
                    users.map((user) => (
                        <div
                            key={user.id}
                            style={{
                                marginBottom: '1rem',
                                width: '20%',
                                padding: '1rem',
                                border: '1px solid gray',
                                borderRadius: '10px',
                            }}
                        >
                            <p>id:{user.id}</p>
                            <p>firstName: {user.firstName}</p>
                            <p>lastName: {user.lastName}</p>
                            <p>Age: {user.age}</p>
                            <button onClick={() => fetchUser(user.id)}>View User</button>
                            <button onClick={() => removeUser(user)}>Remove User</button>

                        </div>
                    ))
                }
            </div>
            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
                <div style={{ width: '300px', padding: '16px' }}>
                    <h2>Add a User</h2>
                    <TextField
                        label="firstName"
                        variant="outlined"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        label="lastName"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        label="Age"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={addUser1}>
                        Add User
                    </Button>
                </div>
            </Drawer>

        </>
    )
}
export default Users;