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
            <form action="" className='flex flex-col justify-center space-y-2 mt-12 p-4 max-w-80 gap-4 border shadow-lg mx-auto rounded-lg' onSubmit={handleSubmit}>
                <label htmlFor="name">Nom de la tâche</label>
                <input type="text" name="name" id="name" placeholder='Nom de la tâche' className='border p-2' value={title} onChange={e => setTitle(e.target.value)} />
                <label htmlFor="dueDate">Date d'échéance</label>
                <input type='datetime-local' name='dueDate' id='dueDate' placeholder='Date d&quot;échéance' className='border p-2' value={dueDate} onChange={e => setDueDate(e.target.value)} />
                <button type="submit" className='justify-self-center grow p-2 m-4 bg-slate-100 rounded-lg'>Créer une tâche</button>
            </form>
            {message !== '' && <p className='text-center mt-4'>{message}</p>}
        </>
    );
}

export default App
