import './styles/main.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import React, {useEffect, useState} from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import {Calendar, DateLocalizer, momentLocalizer} from 'react-big-calendar'
import moment from "moment"

export interface Event {
    id:      number;
    title:   string;
    start:   Date;
    end:     Date;
    allDay?: boolean;
}

export const TASKS_STORAGE_KEY = 'tasks';

// @todo: gérer l'affichage du formulaire avec un clic bouton

function App() {
    const [title, setTitle]               = useState<string>('');
    const [dueDate, setDueDate]           = useState<string>('');
    const [message, setMessage]           = useState<string>('');
    const [events, setEvents]             = useLocalStorage<Array<Event>>(TASKS_STORAGE_KEY, []);
    const localizer: DateLocalizer        = momentLocalizer(moment);
    let deletionTimeout: number | null    = null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !dueDate) {
            setMessage('Veuillez remplir tous les champs.');
            setTimeout(() => {
                setMessage('');
            }, 10000);
            return;
        }

        setEvents([...events, {
            id:     events.length,
            title:  title,
            start:  new Date(dueDate),
            end:    new Date(dueDate),
            allDay: true
        }]);
        setMessage('Tâche créée avec succès.');

        setTitle('');
        setDueDate('');

        setTimeout(() => {
            setMessage('');
        }, 10000);
    };

    useEffect(() => {
        return () => {
            window.clearTimeout(deletionTimeout ?? undefined);
        };
    }, []);

    const handleDelete = (calEvent: { id: number; }) => {
        window.clearTimeout(deletionTimeout ?? undefined);
        deletionTimeout = window.setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            window.confirm('Voulez-vous vraiment supprimer cette tâche ?') && setEvents(events.filter(event => event.id !== calEvent.id));
        }, 250);
    };

    return (
        <>
            <h1 className='flex justify-center text-4xl text-violet-500 underline decoration-dotted font-bold font-sans mt-8'>Cahier de texte</h1>
            <form action="" className='flex flex-col justify-center space-y-2 mt-12 p-4 max-w-80 gap-4 border shadow-lg mx-auto rounded-lg' onSubmit={handleSubmit}>
                <label htmlFor="name">Nom de la tache</label>
                <input type="text" name="name" id="name" placeholder='Nom de la tâche' className='border p-2' value={title} onChange={e => setTitle(e.target.value)} />
                <label htmlFor="dueDate">Date d'échéance</label>
                <input type='date' name='dueDate' id='dueDate' placeholder='Date d&quot;échéance' className='border p-2' value={dueDate} onChange={e => setDueDate(e.target.value)} />
                <button type="submit" id='submit' className='justify-self-center grow bg-violet-300 p-2 m-4 rounded-lg'>Créer une tâche</button>
            </form>
            {message !== '' && <p className='text-center text-violet-800 mt-4' id='message'>{message}</p>}

            <hr className='grow bg-violet-400 my-12'/>

            <div className='text-violet-500 text-md mb-4'>🛈 Double-cliquez sur une tache pour la supprimer</div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor='start'
                endAccessor='end'
                onDoubleClickEvent={handleDelete}
                style={{height: 400}}
            />
        </>
    );
}

export default App
