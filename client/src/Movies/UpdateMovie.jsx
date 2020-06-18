import React , { useEffect, useState }from 'react'
import { useParams, useHistory } from "react-router-dom";
import useForm from "./useForm";
import axios from "axios";
import { fetchMovie } from "./Movie";

const initialValue = {
    id: null,
    tite: "",
    director: "",
    metascore: 0,
    stars: []
}

export default function UpdateMovie ({setMovieList, getMovieList}) {
    const [movie, setMovie] = useState(null);
    const { push } = useHistory();
    const { id } = useParams();
    const params = useParams();
    const [values, setValues, setFormValues] = useForm(initialValue);

    const fetchMovie = (id) => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then((res) => {
              setMovie(res.data);
              setFormValues({
                id: res.data.id,
                title: res.data.title,
                director: res.data.director,
                metascore: res.data.metascore,
                stars: res.data.stars});
            })
          .catch((err) => console.log(err.response));
      };

    useEffect(() => {
        fetchMovie(params.id);
      }, [params.id]);

    if (!movie) {
    return <div>Loading movie information...</div>;
    }

    const changeHandler = event => {
    event.persist();
    let value = event.target.value;
    if (event.target.name === "metascore") {
        value = parseInt(value, 10);
    }
    setFormValues({ ...values, [event.target.name]: event.target.value });
    };

    const editSubmit = (id) => {
        axios.put(`http://localhost:5000/api/movies/${id}`, values)
            .then( res => {
                getMovieList()
            })
            .catch( error => {
                console.log(error)
                debugger
            })
        push("/")
    }

    return (
        <div className="updates">
            <form>
                <label> Title:
                    <input
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={changeHandler}>
                    </input>
                </label>
                <br/>
                <label> Director:
                    <input
                        type="text"
                        name="director"
                        value={values.director}
                        onChange={changeHandler}>
                    </input>
                </label>
                <br/>
                <label> Metascore:
                    <input
                        type="text"
                        name="metascore"
                        value={values.metascore}
                        onChange={changeHandler}>
                    </input>
                </label>
                <br/>
                <label> Stars:
                    <input
                        type="text"
                        name="stars"
                        value={values.stars}
                        onChange={changeHandler}>
                    </input>
                </label>
                <br/>
                <button onClick={() => editSubmit(params.id)}>Submit</button>
            </form>
        </div>
    )
}
