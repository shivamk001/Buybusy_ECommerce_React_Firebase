import styles from './products.module.css'
import Card from "../ProductCard/ProductCard.js";
import { productContext } from '../../context';

import { useContext } from 'react';

export default function Products(){

    const {allProducts}=useContext(productContext);
    return (
        <div className={styles.productCardsContainer}>
          {allProducts.map((product, index)=>(<Card key={index} product={product}/>))}    
        </div>
                         
        
    )

}