import React, {useEffect, useState} from "react";
import {Link, Route, Router, Routes, useNavigate, useParams} from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";

function Edit() {
    const navigate = useNavigate()
    const {id} = useParams();
    const [dataProduct, setData] = useState({
        title: '',
        description: '',
        price: ''
    });
    const [formData, setFormData] = useState({
        id: id,
        title: dataProduct.title,
        description: dataProduct.description,
        price: dataProduct.price
    });
    const [isSubmitted, setIsSubmitted] = useState(false);


    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setFormData(data); // Cập nhật formData khi dataProduct thay đổi
            });
    }, [id]);


    function handleSubmit(e) {
        e.preventDefault();
        let result = fetch(`http://localhost:3000/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('done')
                setIsSubmitted(true); // Đặt isSubmitted thành true sau khi PUT hoàn thành
                navigate('/')

            })
            .catch(error => {
                console.error('Error adding product:', error);
            });
    }

    // if (isSubmitted) {
    //     return <Link to="/" />; // chưa về được page
    // }


    function handleChange(e) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <Container>
            <Link to="/">Back</Link>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control value={formData.title}
                                  name="title"
                                  onInput={handleChange}
                                  type="text"
                                  placeholder="Enter Title"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={formData.description}
                                  name="description"
                                  onInput={handleChange}
                                  type="text"
                                  placeholder="Enter Title"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control value={formData.price}
                                  name="price"
                                  onInput={handleChange}
                                  type="text"
                                  placeholder="Enter Title"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default Edit;