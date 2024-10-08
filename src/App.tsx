import './styles/main.css'
import React, {useState} from "react";

function App() {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !dueDate) {
            setMessage('Veuillez remplir tous les champs.');
            setTimeout(() => {
                setMessage('');
            }, 10000);
            return;
        }

        const newTask = JSON.stringify(
            {
                title: title,
                dueDate: dueDate
            }
        );

        localStorage.setItem('task', newTask);
        setMessage('Tâche créée avec succès.');

        setTitle('');
        setDueDate('');

        setTimeout(() => {
            setMessage('');
        }, 10000);
    }

    return (
        <>
            <h1 className='flex justify-center text-4xl text-violet-500 underline decoration-dotted font-bold font-sans mt-12'>Cahier de texte</h1>
            <form action="" className='flex flex-col justify-center space-y-2 mt-12 p-4 max-w-80 gap-4 border shadow-lg mx-auto rounded-lg' onSubmit={handleSubmit}>
                <label htmlFor="name">Nom de la tâche</label>
                <input type="text" name="name" id="name" placeholder='Nom de la tâche' className='border p-2' value={title} onChange={e => setTitle(e.target.value)} />
                <label htmlFor="dueDate">Date d'échéance</label>
                <input type='datetime-local' name='dueDate' id='dueDate' placeholder='Date d&quot;échéance' className='border p-2' value={dueDate} onChange={e => setDueDate(e.target.value)} />
                <button type="submit" className='justify-self-center grow bg-violet-300 p-2 m-4 rounded-lg'>Créer une tâche</button>
            </form>
            {message !== '' && <p className='text-center text-violet-800 mt-4'>{message}</p>}
        </>
    );
}

export default App
