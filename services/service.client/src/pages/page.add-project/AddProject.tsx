import { useEffect, useRef } from 'react'
import { Button, Content, Footer, Form, Header, Textarea, Textbox } from '../../components'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutFlat } from '../../layouts/layout.flat'
import { Method, useHttp } from '../../hooks/hook.use-http'
import { useNavigate } from 'react-router-dom'
import { IJwtPayload, IJwtSet, IProjectCreate } from 'constructum-interfaces'

export const AddProject = () => {
  useTitle('Создание нового проекта')

  const { requestWithInterceptors, statusCode, error } = useHttp()

  const nameFieldRef = useRef<HTMLInputElement>(null)
  const surnameFieldRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()

  const handleCreateProject = () => {
    const userTokens = JSON.parse(localStorage.getItem('token') ?? '{}') as IJwtSet
    const userData = JSON.parse(localStorage.getItem('user') ?? '{}') as IJwtPayload

    if (nameFieldRef.current && surnameFieldRef.current) {
      const data: IProjectCreate = {
        owner: userData.id,
        name: nameFieldRef.current.value,
        description: surnameFieldRef.current.value,
      }

      requestWithInterceptors(
        {
          method: Method.POST,
          url: `${import.meta.env.VITE_API_URL}/api/project/create`,
          headers: {
            Authorization: `Bearer ${userTokens.access}`,
          },
          data: data,
        },
      )
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
          <Textbox forwardref={nameFieldRef} label="Название проекта" placeholder="К примеру: Proj - 1" dangerText="" />
          <Textarea
            forwardref={surnameFieldRef}
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
