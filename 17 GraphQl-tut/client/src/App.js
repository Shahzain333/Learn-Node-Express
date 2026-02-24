import './App.css';
import { useQuery } from '@apollo/client/react'
import { gql } from '@apollo/client';

const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        id
        name 
        email
      }
    }
  }
`

function App() {
  
  const {data, error, loading} = useQuery(query)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className='App'>
      {/* {JSON.stringify(data)} */}
      <table>
        <tbody>
          { 
            data.getTodos.map(todo => <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.user?.username}</td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
