import { useEffect, useRef } from 'react'
import { Button, Content, Footer, Form, Header, Textarea, Textbox } from '../../components'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutFlat } from '../../layouts/layout.flat'
import { Method, useHttp } from '../../hooks/hook.use-http'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

export const AddProject = () => {
  useTitle('Создание нового проекта')

  const { request, statusCode, error } = useHttp()

  const nameFieldRef = useRef<HTMLInputElement>(null)
  const surnameFieldRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleCreateProject = () => {
    const userAccessToken = localStorage.getItem('token').access

    if (nameFieldRef.current && surnameFieldRef.current) {
      request({
        method: Method.POST,
        url: 'http://localhost:7161/api/project',
        headers: {
          Authorization: 'Bearer 0',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          name: nameFieldRef.current.value,
          surname: surnameFieldRef.current.value,
        }),
      })
    }
  }

  useEffect(() => {
    if (statusCode === 200 && nameFieldRef.current && surnameFieldRef.current) {
      setTimeout(() => {
        navigate('/project')
      }, 2000)
    }
  }, [error, statusCode])

  return (
    <LayoutFlat>
      <Header />
      <Content className="login-content">
        <Form className="login-form" formTitle="Новый проект">
          <Textbox forwardRef={nameFieldRef} label="Название проекта" placeholder="К примеру: Proj - 1" dangerText="" />
          <Textarea
            forwardRef={surnameFieldRef}
            label="Описание проекта"
            placeholder="К примеру: проект базы данных по бух. учёту"
            dangerText=""
          />
          <Button onClick={handleCreateProject} label="Создать" />
        </Form>
      </Content>
      <Footer />
    </LayoutFlat>
  )
}
