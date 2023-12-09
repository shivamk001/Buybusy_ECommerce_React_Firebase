import { useEffect, useState, useContext } from 'react';

import { productContext } from '../../context';
import styles from './filterProducts.module.css';


export default function FilterProduct(){
    const [price, setPrice]=useState(10000)
    const {setqueryObject, categoryArr, setcategoryArr}=useContext(productContext);
    
    function handleChangePrice(e){
        setPrice(parseInt(e.target.value))
    }

    function handleCheckedCategory(e){
        console.log(e.target.checked)
        if(e.target.checked){
            setcategoryArr((prevArr)=>{return [...prevArr, e.target.value]})
        }
        else{
            let index=categoryArr.indexOf(e.target.value);
            console.log(index)
            if(index!==-1){
                let updatedArr=categoryArr.filter((el, i)=> index!==i)
                console.log(updatedArr)
                setcategoryArr([...updatedArr])
            }
        }
    }

    function handleReset(){
        setPrice(10000)
        setcategoryArr([])
    }

    useEffect(()=>{
        console.log('HandleChangePrice:', price);
        setqueryObject({field: 'price', operator: '<=', value: price})
    }, [price])

    useEffect(()=>{
        document.getElementById("priceRangeInput").value=10000
    },[])

    return (
        <div className={styles.searchFilterContainer}>
            <h3>Search and Filter</h3>

            <input type='text' placeholder='Search Product By Name' className={styles.searchBox}/>
            
            <div className={styles.InputDiv}>
                <h4>Select Price Range</h4>
                <p>Price:&nbsp;{price}</p>
                <input type="range" id="priceRangeInput" className={styles.rangeInput} min="0" max="10000" onChange={(e)=>handleChangePrice(e)}/>
            </div>
            <div className={styles.InputDiv}>
                <h4>Select Category</h4>
                <div>
                    
                        <input type="checkbox" id="footwear" value="footwear" onChange={(e)=>handleCheckedCategory(e)}/>
                        <label for="footwear">Footwear</label><br/>
                    

                    
                        <input type="checkbox" id="accessories" value="accessories" onChange={(e)=>handleCheckedCategory(e)}/>
                        <label for="accessories">Accessories</label><br/>
                    

                    
                        <input type="checkbox" id="menclothes" value="menclothes" onChange={(e)=>handleCheckedCategory(e)}/>
                        <label for="menclothes">Men Clothes</label><br/>

                        <input type="checkbox" id="womenclothes" value="womenclothes" onChange={(e)=>handleCheckedCategory(e)}/>
                        <label for="womenclothes">Women Clothes</label>
                    

                </div>
                <input type="button" value="Reset" onClick={()=>handleReset()}/>
            </div>
        </div>
    )
}