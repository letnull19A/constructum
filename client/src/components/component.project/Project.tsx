import { useParams } from 'react-router-dom'

export const Project = () => {
  const { id } = useParams()

  return (
    <div>
      <h1>Проект {id}</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>#</th>
            <th>Название</th>
            <th>Тип</th>
            <th>Null?</th>
            <th>Индекс</th>
            <th>Мин.</th>
            <th>Макс.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>
              <input type="text" />
            </td>
            <td>
              <select>
                <option>GUID</option>
                <option>Int16</option>
                <option>Int32</option>
                <option>Int64</option>
              </select>
            </td>
            <td>
              <input type="checkbox" />
            </td>
            <td>
              <select>
                <option>UNIQUE</option>
                <option>INDEX</option>
              </select>
            </td>
            <td>
              <input type="number" />
            </td>
            <td>
              <input type="number" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
