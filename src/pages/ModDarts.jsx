import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const ModDarts = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.dartsId;
    const [showModal, setShowModal] = useState(false);
    const [hiba, setHiba] = useState(null);
    const [jatekos, setJatekos] = useState({
        name: '',
        birth_date: '',
        world_ch_won: 0,
        profile_url: '',
        image_url: ''
    });

    useEffect(() => {
        const adatokLehivasa = async () => {
            try {
                const valasz = await axios.get(`https://darts.sulla.hu/darts/${id}`);
                setJatekos(valasz.data);
            } catch (error) {
                setHiba(error);
                console.error("Hiba: ", error);
            }
        };
        adatokLehivasa();
    }, [id]);

    const valtozasKezelo = (event) => {
        const { name, value } = event.target;
        setJatekos(prevState => ({
            ...prevState,
            [name]: name === 'world_ch_won' ? Number(value) : value
        }));
    };

    const kuldesKezelo = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`https://darts.sulla.hu/darts/${id}`, jatekos);
            setShowModal(true);
        } catch (error) {
            setHiba(error);
            console.error("Hiba: ", error);
        }
    };

    return (
        <>
            <div className="p-5 content bg-ivory text-center">
                <h2>Darts játékos módosítása</h2>
                <form onSubmit={kuldesKezelo}>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label">Játékos neve:</label>
                        <div className="col-sm-9">
                            <input type="text" name="name" value={jatekos.name} onChange={valtozasKezelo} className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label">Születési idő:</label>
                        <div className="col-sm-9">
                            <input type="date" name="birth_date" value={jatekos.birth_date} onChange={valtozasKezelo} className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label">Nyert VB-k száma:</label>
                        <div className="col-sm-9">
                            <input type="number" name="world_ch_won" value={jatekos.world_ch_won} onChange={valtozasKezelo} className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label">Profil URL-je:</label>
                        <div className="col-sm-9">
                            <input type="text" name="profile_url" value={jatekos.profile_url} onChange={valtozasKezelo} className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label">Kép URL-je:</label>
                        <div className="col-sm-9">
                            <input type="text" name="image_url" value={jatekos.image_url} onChange={valtozasKezelo} className="form-control" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        <i className="bi bi-send me-2"></i> Küldés
                    </button>
                </form>
            </div>

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1055, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Sikeres módosítás!</h5>
                            </div>
                            <div className="modal-body">
                                A darts játékos adatait sikeresen módosítottuk!
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => navigate("/")}>
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