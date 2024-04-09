import React from 'react';
import { Link } from 'react-router-dom';

function Solicitudes() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center">
            <h1 className="display-1">404</h1>
            <h2>Solicitudes</h2>
            <p>Solicitudes.</p>
            <Link to="/" className="btn btn-primary">Go to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Solicitudes;