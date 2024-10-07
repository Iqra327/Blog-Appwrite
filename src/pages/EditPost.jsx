import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/config'

function EditPost() {
  const [post, setPost] = useState([]);
  const {slug} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(slug){
      appwriteService.getPost(slug).then ((post) => {
        if(post) {
          setPost(post);
        }
      })
    }  else {
      navigate('/');
    }
  }, [slug, navigate])
  
  return post ? (
    <div>
      <Container>
        <PostForm post={post}/>
      </Container>
    </div>
  ) : null;
}

export default EditPost