import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHead,
  CardImage,
  Content,
  Footer,
  Header,
  Menu,
} from '../../components'
import { LayoutDefault } from '../../layouts/layout.default'
import './Account.scss'
import { IJwtPayload } from 'constructum-interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faBitbucket, faSquareGitlab, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Github, Linkedin, Pencil } from 'react-bootstrap-icons'

export const Account = () => {
  const [userData, setUserData] = useState<IJwtPayload>()

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('user') ?? '{}'))
  }, [])

  return (
    <LayoutDefault>
      <Menu />
      <Header />
      <Content className="account-content">
        <div className="profile-section">
          <Card className="profile">
            <CardImage>
              <img src="https://imgholder.ru/320x200/9f9f9f/fff&text=IMAGE+HOLDER&font=arial" />
            </CardImage>
            <CardHead>
              {userData?.nickname} ({userData?.name} {userData?.surname})
            </CardHead>
            <CardContent>
              <p>О себе:</p>
              <p>some text</p>
            </CardContent>
            <CardFooter>
              <Button
                label={
                  <>
                    <Pencil />
                    Редактировать
                  </>
                }
              />
            </CardFooter>
          </Card>
          <Card className="profile-contacts">
            <CardHead>Контакты</CardHead>
            <CardContent>
              <p>
                <FontAwesomeIcon className="fw-icon" icon={faEnvelope} />
                E-Mail: {userData?.email}
              </p>
              <p>
                <FontAwesomeIcon className="fw-icon" icon={faTwitter} />
                Twitter:
              </p>
              <p>
                <FontAwesomeIcon className="fw-icon" icon={faTelegram} />
                Telegram:
              </p>
              <p>
                <Linkedin className="fw-icon" />
                LinkedIn:
              </p>
              <p>
                <Github className="fw-icon" />
                GitHub:
              </p>
              <p>
                <FontAwesomeIcon className="fw-icon" icon={faSquareGitlab} />
                GitLab:
              </p>
              <p>
                <FontAwesomeIcon className="fw-icon" icon={faBitbucket} />
                BitBucket:
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid-desk">
          <div className="section">
            <h2>Закреплнные</h2>
            <div className="cards">
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
            </div>
          </div>
          <div className="section">
            <h2>Избранное</h2>
            <div className="cards">
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
            </div>
          </div>
          <div className="section">
            <h2>Последнее редактируемое</h2>
            <div className="cards">
              <Card>123</Card>
              <Card>123</Card>
            </div>
          </div>
          <div className="section">
            <h2>История</h2>
            <div className="cards">
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
              <Card>123</Card>
            </div>
          </div>
        </div>
      </Content>
      <Footer />
    </LayoutDefault>
  )
}
