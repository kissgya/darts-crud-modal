import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const DartsLista = () => {
    const [jatekosok, setJatekosok] = useState([]);
    const [tolt, setTolt] = useState(false);
    const [hiba, setHiba] = useState(null);

    useEffect(() => {
        setTolt(true);
        axios
            .get("https://darts.sulla.hu/darts")
            .then((res) => setJatekosok(res.data))
            .catch((error) => {
                setHiba(error);
                console.error("Hiba: ", error);
            })
            .finally(() => setTolt(false));
    }, []);

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {tolt ? (
                <div className="spinner-border text-warning" role="status"></div>
            ) : (
                <div>
                    <h2>Darts játékosok</h2>
                    {jatekosok.map((jatekos, index) => (
                        <div className="card col-sm-3 d-inline-block m-1 p-2" key={index}>
                            <p className="text-dark">Játékos neve: {jatekos.name}</p>
                            <p className="text-danger">Születési ideje: {jatekos.birth_date}</p>
                            <p className="text-danger">Megnyert világbajnokságai: {jatekos.world_ch_won}</p>
                            <div className="card-body">
                                <Link to={jatekos.profile_url} className="btn btn-primary" target="_blank">
                                    Profil link
                                </Link>
                                <br /><br />
                                <Link to={"/darts/" + jatekos.id}>
                                    <img
                                        alt={jatekos.name}
                                        className="img-fluid"
                                        style={{ maxHeight: 200 }}
                                        src={jatekos.image_url || "https://placehold.co/400x800"}
                                    />
                                </Link>
                                <br />
                                <Link to={"/darts/" + jatekos.id}>
                                    <i className="bi bi-eye fs-5 me-2"></i>
                                </Link>
                                <Link to={"/mod-darts/" + jatekos.id}>
                                    <i className="bi bi-pencil fs-5 me-2"></i>
                                </Link>
                                <Link to={"/del-darts/" + jatekos.id}>
                                    <i className="bi bi-trash3 fs-5"></i>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};