# graphql-webinar

## Шаг 1 в NodeJS

В данном примере мы рассматриваем самые простые способы использования GraphQL без сервера, без сложных типов и вложенных полей.

## Запуск

Для запуска достаточно установить зависимости.

```bash
npm i
```

И запустить скрипт простой командой

```bash
node index.js
```

## Что в данном примере происходит

Мы не стоим на месте - мы добавили новую сущность "Автор".

```javascript
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represent an author',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  })
})
```

По аналогии с постом, у этой сущности поля id (идентификатор) и name.

Теперь, чтобы получить вместе с постами еще списко авторов мы расширяем наш запрос:

```
{ posts {id, title}, authors {id} }
```

Теперь у нас, рядом с постами, есть еще и посты. Наш скрипт отдает следующий ответ:

```json
{"data":{"posts":[{"id":"123","title":"Post about GraphQL"}],"authors":[{"id":"1"}]}}
```

В ответе есть и посты и авторы - как мы и хотели и все это в рамках одного запроса:)
