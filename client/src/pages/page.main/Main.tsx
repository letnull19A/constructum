import { Content, Footer, Header } from '../../components'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutFlat } from '../../layouts/layout.flat'

export const Main = () => {
  useTitle('Constructum - Главная страница')

  return (
    <LayoutFlat>
      <Header />
      <Content>
        <h1>О проекте</h1>
        <article>
          Constructum - проект помогающий разработчику визуально разрабатывать макеты баз данных, которые в дальнейшем
          можно преобразовать в реально существующие БД и использовать в продакшене. Сервис предоставляет самый
          необходимый инструментарий для работы базами данных.
        </article>
        <h2>Преимущества</h2>
        <ul>
          <li>Онлайн сервис</li>
          <li>Возможность командной работы</li>
          <li>Поддержка MySQL, PostgreSQL</li>
          <li>Импорт в популярные ORM: EntityFramework, Dapper, Prizma</li>
        </ul>
        <h3>Доступные функции</h3>
        <ul>
          <li>Создание проектов будующий баз даных</li>
          <li>Создание шаблонов сущностей</li>
          <li>Работа над одним проектом в realtime</li>
          <li>Заполнение таблиц тестовыми данными</li>
          <li>Вывод диаграмм таблиц</li>
          <li>Установка отношений и связей в БД</li>
        </ul>
      </Content>
      <Footer />
    </LayoutFlat>
  )
}
