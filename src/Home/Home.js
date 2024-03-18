import './Home.css'

function Home() {
  return (
     <div className="card_home">
      <div className="card">
        <div className="card-header text-center">
          Bienvenidos
        </div>
        <div className="card-body">
          <h5 className="card-title">Sistema de reservacion de aulas</h5>
          <p className="card-text">
            En este sistema podras realizar la reservación de aulas para tus examenes
          </p>
          <div>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Codigo SIS</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <button type="submit" className="btn btn-primary">Ingresar</button>
          </form>
          </div>
        </div>
        <div className="card-footer text-body-secondary text-center">
          Powered by NKsoft S.R.L.
        </div>
      </div>
     </div>
  );
}

export default Home;
