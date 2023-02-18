import {useSelector, useDispatch} from 'react-redux'
import { Card, CardHeader, CardImg, CardTitle, Button } from "reactstrap"
import { baseUrl } from '../../baseUrl'
import { removeProduto, incrementaQuantidade, decrementaQuantidade } from '../../redux/carrinho'

const Carrinho = () => {

    const {carrinho} = useSelector(rootReducer => rootReducer.carrinhoReducer)

    const {login} = useSelector(rootReducer => rootReducer.loginReducer)

    const precoTotal = carrinho.reduce((acumulador, produto) => { return acumulador += Number(produto.preco) * produto.quantity}, 0)

    const quantidade = carrinho.reduce((acumulador, produto) => { return acumulador += produto.quantity}, 0)

    const dispatch = useDispatch()

    const removeProdutos = (produto) => {
        dispatch(removeProduto(produto))
    }

    const incrementaQuantidades = (produto) => {
        dispatch(incrementaQuantidade(produto))
    }

    const decrementaQuantidades = (produto) => {
        dispatch(decrementaQuantidade(produto))
    }

    const comprarProdutos = () => {
        const pedidos = {
            precoTotal: precoTotal,
            carrinho: carrinho,
            quantidade: quantidade,
            token: login
        }
        fetch(baseUrl + 'pedidos', {
            method: 'POST',
            body: JSON.stringify(pedidos),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.ok) {
                    return response
                } else {
                    var error = new Error('Error' + response.status + ": " + response.statusText)
                    error.response = response
                    throw error
                }
            }, 
            error => {
                var errmess = new Error(error.message)
                throw errmess
            })
            .then(response => response.json())
            .then(response => {
                alert("Pedido realizado com sucesso.")
            })
            .catch(error => {
                alert("Não foi possível realizar o seu pedido.")
                console.log('Não foi possível realizar seu pedido. Erro: ', error.message)
            })
    }

    const exibeCarrinho = () => {
        if (carrinho.length > 0) {
            return (
                <div>
                    {carrinho.map(produto => (
                    <Card className='offset-1 col-10 mb-4'>
                        <CardHeader>
                            <CardTitle>{produto.nome} - <span>R${produto.preco}</span></CardTitle>         
                        </CardHeader>
                        <div className='row'>
                            <div className='col-sm-4 col-10'>
                                <CardImg className='col-sm-6 col-12' height="200px" src={baseUrl + produto.imagem} alt={produto.nome} />
                            </div>
                            <div className='row col-sm-6 col-10 mt-5 mx-5'>
                                    <div className='col-sm-2 col-4'><Button onClick={() => {decrementaQuantidades(produto.id)}} className='col-12'>-</Button></div>
                                    <div className='col-sm-1 col-2'><p className='text-center lead p-0 m-0'>{produto.quantity}</p></div>
                                    <div className='col-sm-2 col-4'><Button onClick={() => {incrementaQuantidades(produto.id)}} className='col-12'>+</Button></div>
                                    <div className='col-sm-7 col-10 mt-4 mb-3 mt-sm-0 mb-sm-0'><Button onClick={() => {removeProdutos(produto.id)}} className='col-12' color="danger">Remover</Button></div>
                                
                        </div>
                    </div>
                </Card>))}
                <div className='row text-center'>
                    <p className='lead'>Total: R$ {precoTotal.toFixed(2)}</p>
                    <Button onClick={comprarProdutos} className='offset-3 p-3 col-6' color="success">Comprar Produtos</Button>
                </div>
    
                </div>
            )
        } else {
            return (<div className='offset-1'>Não há produtos adicionados ao carrinho.</div>)
        }
    }

    return (
        <div>
            <h1 className="mx-5 my-5">Produtos Adicionados no Carrinho</h1>
            {exibeCarrinho()}
        </div>)
}

export default Carrinho