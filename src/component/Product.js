import React, {useEffect, useState} from "react";
import {Button, Table, ToastContainer} from "react-bootstrap";
import {Link} from "react-router-dom";

function Product() {
    const tBody = document.getElementById('tBody');
    const [listProduct, setListProduct] = useState([]);
    const [product, setProduct] = useState([]);
    const [showModal, setShowModal] = useState(-1);
    const [newProduct, setNewProduct] = useState([
        {
            price: '',
            title: '',
            id: '',
            description: ''
        }
    ]);
    const [submitAdd, setSubmitAdd] = useState(false);
    const [removeClick, setRemoveClick] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('')


    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(res => res.json())
            .then(json => setListProduct(json))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        if (removeClick) {
            fetch('http://localhost:3000/products')
                .then(response => response.json())
                .then(data => {
                    setListProduct(data);
                    setRemoveClick(false);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [removeClick]);


    function handleRemoveProduct(id) {
        let csm = window.confirm("Are you sure you want to delete this product?");
        if (csm){
            fetch(`http://localhost:3000/products/${id}`, {
                method: 'DELETE',
            })
                .then(() => {
                    setRemoveClick(true); // Gọi useEffect sau khi xóa
                })
                .catch(error => console.error('Error deleting todo:', error));
        }

    }


    function handleAddProduct(e) {
        e.preventDefault();

        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct),
        }).then(response => response.json())
            .then(data => {
                setListProduct([...listProduct, data]);
                setSubmitAdd(false);
                setShowModal(-1);
                setNewProduct({
                        price: '',
                        description: '',
                        id: '',
                        title: '',
                    }
                )
            })
            .catch(error => console.error('Error adding todo:', error));
    }


    function handleCloseModal() {
        setShowModal(-1);
    }

    return (
        <>
            <div className="container-fluid">
                <div>
                    <h2>Danh sách sản phẩm</h2>
                </div>

                <Button className="mb-3" variant="success" onClick={() => setShowModal(-2)}>Add</Button>{' '}

                <Table striped="columns">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên sản phẩm</th>
                        <th>Mô tả</th>
                        <th>Giá</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {(listProduct || []).map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td className="text-primary" >
                                <Link to={`/product/${item.id}`}>{item.title}</Link>
                            </td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td className="d-flex justify-content-end">
                                <button type="button" className="btn btn-danger me-2"
                                        onClick={() => handleRemoveProduct(item.id)}>Xóa
                                </button>
                                <Link to={`/edit/${item.id}`} className="btn btn-primary">Sửa</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>

            {/*Modal*/}
            <div className="modal fade show" style={{display: showModal !== -1 ? 'block' : 'none'}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleAddProduct}>
                            <div className="modal-header">
                                <h5 className="modal-title">Add Product</h5>
                                <button type="button" className="btn-close"
                                        onClick={handleCloseModal}></button>
                            </div>

                            <div className="modal-body" id="tBody">
                                <div className="mb-3">
                                    <label htmlFor="id" className="form-label">Id</label>
                                    <input type="number" className="form-control" id="id" value={newProduct.id}
                                           onInput={(e) => setNewProduct({...newProduct, id: e.target.value})}
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" value={newProduct.title}
                                           onInput={(e) => setNewProduct({...newProduct, title: e.target.value})}
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description"
                                           value={newProduct.description}
                                           onInput={(e) => setNewProduct({...newProduct, description: e.target.value})}
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="text" className="form-control" id="price" value={newProduct.price}
                                           onInput={(e) => setNewProduct({...newProduct, price: e.target.value})}
                                           required/>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save changes
                                </button>
                                <ToastContainer/>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Product;