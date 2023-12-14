import { useEffect, useState, useContext, useRef } from 'react';
import { toast } from 'react-toastify';

import { productContext } from '../../context';
import styles from './filterProducts.module.css';



export default function FilterProduct(){
    const [price, setPrice]=useState(10000)
    const priceRef=useRef();
    const footwearRef=useRef();
    const accessoriesRef=useRef();
    const menRef=useRef();
    const womenRef=useRef();
    const {setqueryObject, categoryArr, setcategoryArr, setsearchText}=useContext(productContext);
    
    function handleChangePrice(e){
        setPrice(parseInt(e.target.value))
    }

    function handleCheckedCategory(e){
        //console.log(e.target.checked)
        if(e.target.checked){
            setcategoryArr((prevArr)=>{return [...prevArr, e.target.value]})
        }
        else{
            let index=categoryArr.indexOf(e.target.value);
            console.log(index)
            if(index!==-1){
                let updatedArr=categoryArr.filter((el, i)=> index!==i)
                //console.log(updatedArr)
                setcategoryArr([...updatedArr])
            }
        }
    }

    function handleReset(){
        setPrice(10000)
        footwearRef.current.checked=false
        accessoriesRef.current.checked=false
        menRef.current.checked=false
        womenRef.current.checked=false
        priceRef.current.value=10000
        setcategoryArr([])
        toast('Reset Done')
    }

    function handleNameChange(e){
        setsearchText(e.target.value)
    }

    useEffect(()=>{
        //console.log('HandleChangePrice:', price);
        setqueryObject({field: 'price', operator: '<=', value: price})
    }, [price, setqueryObject])

    useEffect(()=>{
        document.getElementById("priceRangeInput").value=10000
    },[])

    return (
        <div className={styles.searchFilterContainer}>
            <h3>Search and Filter</h3>

            <input type='text' placeholder='Search Product By Name' className={styles.searchBox} onChange={(e)=>handleNameChange(e)}/>
            
            <div className={styles.InputDiv}>
                <h4>Select Price Range</h4>
                <p>Price:&nbsp;{price}</p>
                <input ref={priceRef} type="range" id="priceRangeInput" className={styles.rangeInput} min="0" max="10000" onChange={(e)=>handleChangePrice(e)}/>
            </div>
            <div className={styles.InputDiv}>
                
                <div className={styles.categoryDiv}>
                        <h4 sty>Select Category</h4>

                        <div className={styles.categoryMember}>
                            <input ref={footwearRef} type="checkbox" id="footwear" value="footwear" onChange={(e)=>handleCheckedCategory(e)}/>
                            <label for="footwear">Footwear</label><br/>
                        </div>

                    

                        <div className={styles.categoryMember}>
                            <input ref={accessoriesRef} type="checkbox" id="accessories" value="accessories" onChange={(e)=>handleCheckedCategory(e)}/>
                            <label for="accessories">Accessories</label><br/>
                        </div>

                    

                        <div className={styles.categoryMember}>
                            <input ref={menRef} type="checkbox" id="menclothes" value="menclothes" onChange={(e)=>handleCheckedCategory(e)}/>
                            <label for="menclothes">Men Clothes</label><br/>
                        </div>


                        <div className={styles.categoryMember}>
                            <input ref={womenRef} type="checkbox" id="womenclothes" value="womenclothes" onChange={(e)=>handleCheckedCategory(e)}/>
                            <label for="womenclothes">Women Clothes</label>
                        </div>

                        <button type="button" onClick={()=>handleReset()}>Reset</button>
                </div>
                
            </div>
        </div>
    )
}