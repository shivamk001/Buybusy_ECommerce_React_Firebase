import styles from './home.module.css'

import { useContext } from "react"
import Spinner from 'react-spinner-material';

import { productContext } from '../../context.js';

import Products from '../Products/Products.js';
import FilterProducts from "../FilterProducts/FilterProducts.js";

export default function Home(){
    //let [loading, setLoading]=useState(true)
    const {showSpinner}=useContext(productContext);
    //setLoading(showSpinner);



    return (
        <section className={styles.home}>  
            <section className={styles.filterSection}>
                <FilterProducts/>

            </section>
            <section className={styles.productSection}>
                {showSpinner?
                
                <div className={styles.spinnerDiv}>
                    <Spinner radius={120} color={"#333"} stroke={2} visible={showSpinner} />
                </div>:
                    <Products/>
            
                }

                    
               
                
            </section>

        </section>

    )
}