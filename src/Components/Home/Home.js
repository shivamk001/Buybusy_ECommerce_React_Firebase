import styles from './home.module.css'

import { useContext } from "react"
import { productContext } from '../../context.js';
import Card from "../ProductCard/ProductCard.js";
import FilterProducts from "../FilterProducts/FilterProducts.js";

export default function Home(){
    const {allProducts}=useContext(productContext);
    console.log(allProducts)
    return (
        <section className={styles.home}>  
            <section className={styles.filterSection}>
                <FilterProducts/>
                <div className={styles.searchDiv}>
                    <input type='text' placeholder='Search Product'/>
                </div>
            </section>
            <section className={styles.productSection}>

                <div className={styles.productCardsContainer}>
                    {allProducts.map((product, index)=>(<Card key={index} product={product}/>))}
                </div>
                
            </section>

        </section>

    )
}