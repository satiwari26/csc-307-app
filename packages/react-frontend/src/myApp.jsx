import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  async function removeOneCharacter(index) {
    const characterToRemove = characters[index];
  
    try {
      const response = await fetch(`http://localhost:8000/users/${characterToRemove._id}`, {
        method: "DELETE",
      });
  
      if (response.status === 200) {
        const updated = characters.filter((character, i) => i !== index);
        setCharacters(updated);
      } else {
        console.log('Error removing character:', response);
      }
    } catch (error) {
      console.log('Error removing character:', error);
    }
  }

    /**
     * 
     * update the list of characters if 201 response return
     */
    function updateList(person) { 
      postUser(person)
        .then((response) => {
          if (response.status === 201) {
            response.json().then((data) => {
              setCharacters([...characters, data]);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }

    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter}/>
        <Form handleSubmit={updateList}/>
    </div>
  );
}

export default MyApp;