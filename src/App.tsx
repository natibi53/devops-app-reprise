import './styles/main.css'

function App() {
  return (
    <>
        <form action="">
            <label htmlFor="name" className='text-9xl'>Nom de la tâche</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="dueDate">Date d'échéance</label>
            <input type='date' name='dueDate' id='dueDate' />
            <button type="submit">Créer une tâche</button>
        </form>
    </>
  );
}

export default App
