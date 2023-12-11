import styles from './form.module.css'

export default function Form({handleSubmit, children, heading}){
    return <>
        
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>{heading}</h2>
            {children}
        </form>
    </>
}