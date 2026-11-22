import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export const EgyDarts = () => {
    const params = useParams();
    const id = params.dartsId;
    const [jatekos, setJatekos] = useState({});
    const [tolt, setTolt] = useState(false);
    const [hiba, setHiba] = useState(null);

    useEffect(() => {
        setTolt(true);
        axios
            .get(`https://darts.sulla.hu/darts/${id}`)
            .then((res) => setJatekos(res.data))
            .catch((error) => {
                setHiba(error);
                console.error("Hiba: ", error);
            })
            .finally(() => setTolt(false));
    }, [id]);

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {tolt ? (
                <div className="spinner-border text-warning" role="status"></div>
            ) : (
                <div>
                    <h2>Darts játékos adatai</h2>
                    <div className="card p-3">
                        <h5 className="card-title">Játékos neve: {jatekos.name}</h5>
                        <p className="lead">Születési ideje: {jatekos.birth_date}</p>
                        <p className="lead">Megnyert világbajnokságai: {jatekos.world_ch_won}</p>
                        <div className="card-body">
                            <Link to={jatekos.profile_url} className="btn btn-primary" target="_blank">
                                Profil link
                            </Link>
                            <br /><br />
                            <Link to={"/"}>
                                <img
                                    alt={jatekos.name}
                                    className="img-fluid"
                                    style={{ maxHeight: 400 }}
                                    src={jatekos.image_url || "https://placehold.co/400x800"}
                                />
                            </Link>
                            <br />
                            <Link to={"/"}>
                                <i className="bi bi-arrow-return-left fs-5 me-2"></i>
                            </Link>
                            <Link to={"/mod-darts/" + jatekos.id}>
                                <i className="bi bi-pencil fs-5 me-2"></i>
                            </Link>
                            <Link to={"/del-darts/" + jatekos.id}>
                                <i className="bi bi-trash3 fs-5"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};