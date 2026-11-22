import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const DelDarts = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.dartsId;
    const [showModal, setShowModal] = useState(false);
    const [hiba, setHiba] = useState(null);
    const [jatekos, setJatekos] = useState({});

    useEffect(() => {
        axios
            .get(`https://darts.sulla.hu/darts/${id}`)
            .then((res) => setJatekos(res.data))
            .catch((error) => {
                setHiba(error);
                console.error("Hiba: ", error);
            });
    }, [id]);

    return (
        <>
            <div className="p-5 m-auto text-center content bg-ivory">
                <div>
                    <h2>Darts játékos törlése</h2>
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
                                <i className="bi bi-arrow-return-left fs-4 me-2"></i>
                            </Link>
                            <Link to={"/mod-darts/" + jatekos.id}>
                                <i className="bi bi-pencil fs-4 me-2"></i>
                            </Link>
                        </div>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                axios
                                    .delete(`https://darts.sulla.hu/darts/${id}`)
                                    .then(() => setShowModal(true))
                                    .catch((error) => {
                                        setHiba(error);
                                        console.error("Hiba: ", error);
                                    });
                            }}
                        >
                            <button type="submit" className="btn btn-danger fs-4">
                                <i className="bi bi-trash3 fs-4 me-2"></i>Törlés
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1055, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-danger text-white">
                                <h5 className="modal-title">Sikeres törlés!</h5>
                            </div>
                            <div className="modal-body">
                                A darts játékos adatait sikeresen töröltük!
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={() => navigate("/")}>
                                    Rendben
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};