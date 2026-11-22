import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const UjDarts = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const kuldesKezelo = async (event) => {
        event.preventDefault();
        try {
            await axios.post("https://darts.sulla.hu/darts", {
                name: event.target.elements.name.value,
                birth_date: event.target.elements.birth_date.value,
                world_ch_won: Number(event.target.elements.world_ch_won.value),
                profile_url: event.target.elements.profile_url.value,
                image_url: event.target.elements.image_url.value
            });
            setShowModal(true);
        } catch (error) {
            console.error("Hiba: ", error);
        }
    };

    return (
        <>
            <div className="p-5 content bg-ivory text-center">
                <h2>Új darts játékos felvétele</h2>
                <form onSubmit={kuldesKezelo}>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label">Játékos neve:</label>
                        <div className="col-sm-9">
                            <input type="text" name="name" className="form-control" required />
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label">Születési idő:</label>
                        <div className="col-sm-9">
                            <input type="date" name="birth_date" className="form-control" required />
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label">Nyert VB-k száma:</label>
                        <div className="col-sm-9">
                            <input type="number" name="world_ch_won" className="form-control" required />
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label">Profil URL-je:</label>
                        <div className="col-sm-9">
                            <input type="text" name="profile_url" className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label">Kép URL-je:</label>
                        <div className="col-sm-9">
                            <input type="text" name="image_url" className="form-control" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success">
                        <i className="bi bi-send me-2"></i> Küldés
                    </button>
                </form>
            </div>

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1055, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title">Sikeres létrehozás!</h5>
                            </div>
                            <div className="modal-body">
                                Az új darts játékos adatait sikeresen létrehoztuk!
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={() => navigate("/")}>
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