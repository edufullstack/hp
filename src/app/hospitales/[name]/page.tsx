import styles from "../../page.module.css";

export default function HospitalName({ params }: any) {
  console.log(params);
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h2>Pagina hospital por nombre</h2>
        <p>{params.name}</p>
      </div>
    </main>
  );
}
