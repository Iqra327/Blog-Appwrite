import React, {useState, useEffect} from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config'

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);
  appwriteService.getPosts([]).then((posts) => {
    if(posts){
      setPosts(posts.documents)
    }
  })
  return (
    <div>
      <Container>
        <div>
        {
          posts.map((post) => (
            <div key={post.$id}>
              <PostCard post={post}/>
            </div>
          ))
        }
        </div>
      </Container>
    </div>
  )
}

export default AllPosts