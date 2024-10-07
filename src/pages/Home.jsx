import React, {useEffect, useState} from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if(posts){
        setPosts(posts.documents)
      }
    })
  }, [])

  if(posts.length === 0){
    return (
      <Container>
        <div>
          <h1>
            Login to read posts
          </h1>
        </div>
      </Container>
    )
  }

  return (
    <div>
      <Container>
        <div>
          {
            posts.map((post) => (
              <div key={post.$id}>
                <PostCard {...post}/>
              </div>
            ))
          }
        </div>
      </Container>
    </div>
  )
}

export default Home