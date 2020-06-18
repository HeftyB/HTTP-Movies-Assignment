import React from 'react';
import { useHistory } from "react-router-dom";
import useForm from "./useForm";
import axios from 'axios';

const initialValue = {
    id: Date.now(),
    tite: "",
    director: "",
    metascore: 0,
    stars: []
}

export default function AddMovie({getMovieList}) {
    const [values, setValues] = useForm(initialValue);
    const { push } = useHistory();

    const addMovie = () => {
        axios.post("http://localhost:5000/api/movies", values)
            .then( res => {
                console.log(res)
                debugger
                getMovieList()
            })
            .catch( error => {
                console.log(error);
                debugger
            })
        push("/")
    }

    return (
        <div>
            <form onSubmit={() => addMovie()}>
                <label>
                    <input
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={setValues}/>
                </label>
                <label>
                    <input
                        type="text"
                        name="director"
                        value={values.director}
                        onChange={setValues}/>
                </label>
                <label>
                    <input
                        type="text"
                        name="metascore"
                        value={values.metascore}
                        onChange={setValues}/>
                </label>
                <label>
                    <input
                        type="text"
                        name="stars"
                        value={values.stars}
                        onChange={setValues}/>
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}
