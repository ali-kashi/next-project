import Product from "./Product";

export default function ProductsList({products}){
    return(
        <div className="product-list">
            {
                products.map(
                    (product,index)=> <Product key={index} product={product}/>
                )
            }
        </div>
    )
}