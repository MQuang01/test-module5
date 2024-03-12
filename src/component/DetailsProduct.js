import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card} from "react-bootstrap";

function DetailsProduct() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [product, setProduct] = useState({
        title: '',
        price: '',
        description: ''
    });

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then(res => res.json())
            .then(json => setProduct(json))
            .catch(err => console.log(err))
    })
    function handleBack() {
        navigate('/');
    }

    return (
        <>
            <div className="container d-flex justify-content-center mt-5">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>
                            Mô tả : {product.description}
                        </Card.Text>
                        <Card.Text>
                            Giá : {product.price}
                        </Card.Text>
                        <Button type="button" variant="primary" onClick={handleBack}>Trở lại</Button>
                    </Card.Body>
                </Card>
            </div>

        </>
    );
}

export default DetailsProduct;