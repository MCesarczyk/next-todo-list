import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
import { firestore } from '../firebase/clientApp';
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
  const todosCollection = collection(firestore, 'todos');

  const [todos, setTodos] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getTodos = async () => {
    const todosQuery = query(todosCollection, where('done', '==', false), limit(10));
    const querySnapshot = await getDocs(todosQuery);

    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnapshot.forEach((snapshot) => {
      result.push(snapshot);
    });

    setTodos(result);
  };

  useEffect(() => {
    getTodos();

    setTimeout(() => {
      setLoading(false);
    }, 2000)

  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Todos app</title>
        <meta name="description" content="Next.js firebase todos app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Todos app
        </h1>
        <div className={styles.grid}>
          {
            loading ? (
              <div className={styles.card}>
                <h2>Loading</h2>
              </div>
            ) :
              todos.length === 0 ? (
                <div className={styles.card}>
                  <h2>No undone todos</h2>
                  <p>Consider adding a todo from <a href="/add-todo">here</a></p>
                </div>
              ) : (
                todos.map((todo) => {
                  return (
                    <div className={styles.card}>
                      <h2>{todo.data.arguments['title']}</h2>
                      <p>{todo.data.arguments['description']}</p>
                      <div className={styles.cardActions}>
                        <button type="button">Mark as done</button>
                        <button type="button">Delete</button>
                      </div>
                    </div>
                  )
                })
              )
          }
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="#"
          rel="noopener noreferrer"
        >
          Todos app
        </a>
      </footer>
    </div>
  )
}
export default Home