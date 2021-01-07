import React, { useState, useEffect } from 'react'
import axios from 'axios'

function fetchData() {
  return axios.get('https://randomuser.me/api')
  .then(({data}) => {
    // handle success
    console.log(data);
    return data;
  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
}

const getFullUserName = (userInfo) => {
  const {name: {first, last}} = userInfo;
  return `${first} ${last}`;
}

function App() {

  const [counter, setCounter] = useState(0);
  const [userData, setUserData] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [nextPageNumber, setNextPageNumber] = useState(1);

  const fetchNextUser = () => {
    fetchData().then(randomData => {
      // setUserData(JSON.stringify(randomData, null, 2) || 'No data found!')
      if (randomData === undefined) return;
      const newUserInfo = [
        ...userInfo,
        ...randomData.results
      ]
      setUserInfo(newUserInfo);
      setNextPageNumber(randomData.info.page + 1);
    });
  }

  useEffect(() => {
    fetchNextUser();
  }, [])

  return (
    <div className="App">
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increase</button>
      <button onClick={() => setCounter(counter - 1)}>Decrease</button>
      <hr/>
      {/* <button onClick={() => fetchData()}>Fetch Data</button>
      <pre>
        {userData}
      </pre> */}
      <button onClick={() => fetchNextUser()}>Fetch Next User</button>
      {
        userInfo.map((info, idx) => (
          <div key={idx}>
            <p>{getFullUserName(info)}</p>
            <img src={info.picture.large} alt=""/>
          </div>
        ))
      }
    </div>
  );
}

export default App;
