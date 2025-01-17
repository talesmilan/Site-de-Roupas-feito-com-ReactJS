import React, {useState} from 'react'
import {Button, Modal, Form, ModalBody, FormGroup, ModalHeader, Label, Input} from 'reactstrap'
import { baseUrl } from '../baseUrl'
import MensagemErros from './MensagemErros'
import { useSelector, useDispatch } from 'react-redux'
import { addComentarios } from '../redux/comentarios'
import axios from 'axios'

const CommentButton = ({produtoId}) => {

    const [dados, setDados] = useState({
        isModalOpen: false
      })

    const [ erros, setErros] = useState([])

    const dispatch = useDispatch()

    const {comentarios} = useSelector(rootReducer => rootReducer.comentariosReducer)

    const toggleModal = () => {
        setDados({
          isModalOpen: !dados.isModalOpen
        });
      }

    const handleComment = (values) => {
        values.preventDefault()
        
    const error = []

    const nome = document.querySelector('#name').value

    const rating = document.querySelector('#rating').value

    const comment = document.querySelector('#comment').value

    if (nome === "" || rating === "" || comment === "") {
        error.push("Todos os campos devem ser preenchidos.")
    }
    if (nome.length !== 0 && (nome.length < 3 || nome.length > 50)) {
        error.push("O nome deve ter entre 3 a 50 caracteres.")
    }

    setErros(error)

    if (error.length === 0) {
        toggleModal()

        const newComment = {
            produtoId: produtoId,
            nota: rating,
            autor: nome,
            comentario: comment
        }
        axios.post(baseUrl + "comentarios", newComment).then(response => {
            dispatch(addComentarios([...comentarios, response.data]))
        }).catch(erro => {
            if(erro.response.data.erro !== undefined) {
                var err = []
                err.push(erro.response.data.erro)
                setErros(err)
            }
        })
    }

            
        }



        return (
            <>
                <div className='offset-lg-1 mt-5'>
                    <Button className='mx-5 mx-lg-0' onClick={toggleModal}><span className='fa fa-pencil fa-lg mr-1'></span> Comentar</Button>
                </div>
                <Modal isOpen={dados.isModalOpen} toggle={toggleModal} >
                    <ModalHeader toggle={toggleModal}>Escreva um comentário</ModalHeader>
                    <ModalBody>
                        <MensagemErros erros={erros} />
                        <Form onSubmit={handleComment}>
                            <FormGroup>
                                <Label htmlFor="rating">Nota</Label>
                                <Input className='col-10' type="select" name="rating" id="rating">
                                    <option disabled value="" >Selecione uma opção</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Seu Nome</Label>
                                <Input type="text" id="name" name="name" placeholder='Seu nome' required/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comentario</Label>
                                <Input type="textarea" id="comment" name="comment" rows="5" required/>
                            </FormGroup>
                            <Button type="submit" value="submit" color='primary'>Enviar</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                        </>
        )
    }


export default CommentButton