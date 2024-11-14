import React from 'react'
import { Link } from 'react-router-dom'

function Errorpage() {
  return (
    <div>
          <div>Erreur 404 not found !</div>
    <Link to ='/'>Revenez à la page d'accueil</Link>
    </div>

  )
}

export default Errorpage