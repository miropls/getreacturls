import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [sites, setSites] = useState([]);
  const [keyword, setKeyword] = useState();

  // Default query on page load
  useEffect(() => {
      fetch("https://api.github.com/search/repositories?q=react")
      .then(res => res.json())
      .then(resData => setSites(resData.items))
  }, [])

  const inputChanged = (event) => {
    setKeyword(event.target.value)
  }

  const findMatchingRepos = async () => {
    const searchString = `https://api.github.com/search/repositories?q=${keyword}`
    await fetch(searchString)
    .then(res => res.json())
    .then(data => setSites(data.items))
  }

  return (
    <div className="App">
      <h1>Repositories</h1>
      <input value={keyword} onChange={inputChanged} />
      <button onClick={findMatchingRepos}>Search</button>
      <table>
        <tr>
          <th>Name</th>
          <th>URL</th>
        </tr>
        <tbody>
          {
            sites.map((site, index) => 
            <tr key={index}>
              <td>{site.full_name}</td>
              <td><a href={site.html_url}>{site.html_url}</a></td>
            </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
