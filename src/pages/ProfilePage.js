import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col,Container} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader'
import {getUserDetails,updateUserProfile} from '../actions/userActions'

const ProfilePage = ({history}) => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState();
    const [confirmPassword,setConfirmPassword]=useState();
    const [message,setMessage]=useState(null)
   const dispatch=useDispatch();
   const userDetails=useSelector((state)=>state.userDetails)
   const {loading,error,user}=userDetails;

   const userLogin=useSelector((state)=>state.userLogin)
  const {userInfo} =userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(()=>{
      if(!userInfo){
       history.push('/login')
      }else{
         if(!user.name){
             dispatch(getUserDetails('profile'))
         }else{
             setName(userInfo.name)
             setEmail(userInfo.email)
         }
      }
  },[dispatch,history,userInfo,user,success])

  const onSubmit=(e)=>{
      e.preventDefault();
      if(password!==confirmPassword){
          setMessage('Passwords do not match')
      }else{
       dispatch(updateUserProfile({id:user._id,name,email,password})) 
      }
  }
    return (
      <Container>
        <Row>
          <Col md={3}>
            <h2>User Profile</h2>
            {message && (
              <Message variant="danger" message={message}>
                {message}
              </Message>
            )}
            {error && (
              <Message variant="danger" message={error}>
                {error}
              </Message>
            )}
            {success && (
              <Message
                variant="success"
                message="Updated Successfully"
              ></Message>
            )}
            {loading && <Loader />}
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col md={9}>
            <h2>My orders</h2>
          </Col>
        </Row>
      </Container>
    );
}

export default ProfilePage
