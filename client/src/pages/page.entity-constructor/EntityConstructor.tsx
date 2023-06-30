import { useEffect, useState } from 'react'
import { Button, Content, Footer, Header, Menu } from '../../components'
import { LayoutDefault } from '../../layouts/layout.default'
import { IInterceptors, Method, useHttp } from '../../hooks/hook.use-http'
import { IFieldData, IJwtSet, IProject } from 'constructum-interfaces'
import { AxiosError } from 'axios'
import qs from 'qs'
import { useParams } from 'react-router-dom'

export const EntityConstructor = () => {
  const [tableName, setTableName] = useState<string>()
  const getFieldRequest = useHttp<Array<IProject>>()
  const userTokens = JSON.parse(localStorage.getItem('token') ?? '{}') as IJwtSet
  const bearer = 'Bearer ' + userTokens.access
  const { id, entity_id, field_id } = useParams()
  const [fileds, setFields] = useState<Array<IFieldData>>()

  const interceptor: IInterceptors = {
    onError: async (error: AxiosError) => {
      const original = error.config

      const data = qs.stringify({
        refresh: userTokens.refresh,
      })

      if (error.code === AxiosError.ERR_BAD_REQUEST) {
        const response = await getFieldRequest.request({
          url: 'http://localhost:3005/api/refresh',
          method: Method.POST,
          data: data,
        })

        console.log(response?.data, response?.data.access)

        localStorage.setItem(
          'token',
          JSON.stringify({ access: response?.data.access, refresh: response?.data.refresh }),
        )
        getFieldRequest.request({ url: original?.url ?? '', method: original?.method ?? '' })
      }

      return await error
    },
  }

  const addField = () => {}

  useEffect(() => {
    getFieldRequest.requestWithInterceptors(
      {
        method: Method.GET,
        url: `http://localhost:7161/api/project/${id}/entities/${entity_id}`,
        data: qs.stringify({}),
        headers: {
          Authorization: bearer,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
      interceptor,
    )
  }, [])

  useEffect(() => {
    setTableName(getFieldRequest.response?.[0].entities?.[0].name)
  }, [getFieldRequest])

  const dataTypes = ['string', 'integer', 'float', 'date', 'time', 'dateTime', 'timeStamp', 'char']

  return (
    <LayoutDefault>
      <Header />
      <Menu />
      <Footer />
      <Content>
        <h2>Конструктор сущности: {tableName}</h2>
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>Действия</th>
              <th>#</th>
              <th>Название</th>
              <th>Тип</th>
              <th>Длина</th>
              <th>Мин.</th>
              <th>Макс.</th>
              <th>Допустим NULL</th>
              <th>Индекс</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>1</td>
              <td>
                <input />
              </td>
              <td>
                <select>
                  <option>---</option>
                  {dataTypes.map((type) => (
                    <option>{type}</option>
                  ))}
                </select>
              </td>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <select>
                  <option>---</option>
                  <option>PrimaryKey</option>
                  <option>Foreign</option>
                </select>
              </td>
              <td>
                <textarea />
              </td>
            </tr>
          </tbody>
        </table>
        <Button label="Добавить поле" />
      </Content>
    </LayoutDefault>
  )
}
