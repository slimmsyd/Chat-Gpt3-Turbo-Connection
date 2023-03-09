import logo from './logo.svg';
import './App.css';
import {useState} from 'react';



function App() {

  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([])

  async function handleSubmit(e){
    e.preventDefault();


    await fetch('http://localhost:5003/',
    { 
      method: "POST",
      headers: { 
        "Content-type": "application/json"
      },
      body: JSON.stringify({message})

    })
    .then((res) => res.json())
    .then((data =>
      {
        const response = data.message
        setResponses([...responses, { question: message, response }]);
        setMessage('')

      }))
      .catch((error) => console.error(error))


      }


  


  return (
    <div className="App">
      <div className = "chat-container">
      {responses.map((r, i) => (
          <div className="message" key={i}>
            <p>{r.question}</p>
            <p>{r.response}</p>
          </div>
        ))}

      <form onSubmit={handleSubmit}>
          <input
            className = "chat-input"
            placeholder='Ask a question'
            rows = '3'
            value = {message}
            onChange= {((e) => setMessage(e.target.value))}

          ></input>

      </form>

        </div>
     
    </div>
  );
}

export default App;
