<template>
  <div>
    <div>
      <div v-for="book in books">
        title: {{book.title}} author: {{book.author}}
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  apollo: {
    // Simple query that will update the 'hello' vue property
    books: {
      query: gql`query {
      books {
        author
        title
      }
    }`,
      subscribeToMore: {
        document: gql`subscription {
  newBook {
    author
    title
  }
}`,
        updateQuery: (prevResult, { subscriptionData }) => {
          prevResult.books.push(subscriptionData.data.newBook)
          return prevResult
        }
      }
    }
  },
}
</script>
