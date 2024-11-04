import React from 'react'
import Account from '../../components/account'
import Transaction from '../../components/transaction'

function User() {
  return (
    <main className='main bg-dark'>
      <Account />
      <Transaction title = 'Argent Bank Checking (x8349)' amount ='$2,082.79' description ='Available Balance'/> 
      <Transaction title = 'Argent Bank Savings (x6712)' amount ='$10,928.42' description ='Available Balance'/> 
      <Transaction title = 'Argent Bank Credit Card (x8349)' amount ='$184.30' description ='Current Balance'/> 

    </main>
  )
}

export default User