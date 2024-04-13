// src/Table.jsx
function TableHeader() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Job</th>
        </tr>
      </thead>
    );
  }
  
function TableBody(props) {
const rows = props.characterData.map((row, index) => {
    return (
    <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <button onClick={() => props.removeCharacter(index)}>
        Delete
        </button>
    </tr>
    );
    }
);
return (
    <tbody>
        {rows}
        </tbody>
    );
}

export default function Table(props) {
    return (
        <table>
        <TableHeader />
        <TableBody characterData={props.characterData} removeCharacter={props.removeCharacter}/>
        </table>
    );
}