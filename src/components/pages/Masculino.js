import RenderProdutoItem from "../RenderProdutoItem";


const Masculino = ({produtos}) => {


    const renderProdutos = produtos.map((produto) => {


    
        if (produto.genero === "masculina" ) {

            return (
                <div key={produto.id} className="col-10 col-md-3 m-3">
                    <RenderProdutoItem produto={produto}/>
                </div>
            )
        }

    });


    return (
        <div>
            <h1 className="mx-5">Produtos Masculinos</h1>
            <div className="row offset-1">{renderProdutos}</div>
        </div>
    )
}

export default Masculino