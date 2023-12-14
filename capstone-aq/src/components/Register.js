import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import './Register.css';
import { useNavigate } from "react-router-dom";


export const Register = ({setActiveTab}) => {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        // Reset the activeTab to 'register' when the component renders
        setActiveTab('/register');
      }, []);

    const handleSubmit = async (event) => {
        console.log('inside handle suibmit')
        event.preventDefault(); // Prevent default form submission
        console.log(event.currentTarget)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log("not valid")
          event.stopPropagation();
          return;
        }
      
        setValidated(true);
      
        // Create a new FormData object from the form
        const formData = new FormData(form);
        console.log(formData)
      
        // Convert FormData to an object
        const formDataObject = {};
        formData.forEach((value, key) => {
            console.log(key)
            console.log(value)
          formDataObject[key] = value;
        });
      
        console.log(formDataObject); // Log the formDataObject
      
        // Send a POST request to your server
        try {
            console.log(JSON.stringify(formDataObject))
          const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
          });
      
          if (response.ok) {
            // Registration was successful, you can redirect or show a success message.
            console.log('Registration successful');
            // You can add code to redirect the user or display a success message here.
          } else {
            // Registration failed, handle the error.
            console.error('Registration failed');
            // You can display an error message to the user here.
          }
        } catch (error) {
          console.error('Error:', error);
          // Handle network errors or other unexpected issues here.
        }
        setActiveTab('/assessment')
        navigate('/assessment');

      };
      

    return (
        <div className="register-container">
            <Form className="register-form" noValidate validated={validated} onSubmit={handleSubmit}>
                <h2>Register</h2>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            name="first_name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                            name="last_name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                                name="username"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Email" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid password.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Button type="submit">Register</Button>
            </Form>
        </div>
    );
};

export default Register;
