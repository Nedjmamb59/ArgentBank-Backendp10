// Import des librairies React et de ses hooks
import React, { useState } from 'react';

// Import des données relatives aux opérations
import operationData from '../../assets/data/operation';

export default function Transaction({ title, amount, description }) {
  // Déclaration des états locaux pour gérer l'ouverture des détails de la transaction, l'édition des notes, etc.
  const [isOpen, setIsOpen] = useState(false);
  const [transactionInfoStates, setTransactionInfoStates] = useState(
    Array(operationData.length).fill(false)
  );
  const [isOpenPencil, setIsOpenPencil] = useState(true);
  const [isOpenPencil2, setIsOpenPencil2] = useState(true);

  // État pour les champs de texte des informations sur les transactions
  const [transactionInputText, setTransactionInputText] = useState(
    localStorage.getItem('transactionInputText') || ''
  );
  const [transactionInputText2, setTransactionInputText2] = useState(
    localStorage.getItem('transactionInputText2') || ''
  );

  // Gestion du changement dans le premier champ de texte
  const handleTransactionInputChange = (e) => {
    setTransactionInputText(e.target.value);
  };

  // Sauvegarde du texte dans le localStorage pour la première entrée
  const handleTransactionInputSave = () => {
    localStorage.setItem('transactionInputText', transactionInputText);
  };

  // Gestion du changement dans le second champ de texte
  const handleTransactionInputChange2 = (e) => {
    setTransactionInputText2(e.target.value);
  };

  // Sauvegarde du texte dans le localStorage pour la deuxième entrée
  const handleTransactionInputSave2 = () => {
    localStorage.setItem('transactionInputText2', transactionInputText2);
  };

  // Fonction pour afficher ou masquer les informations d'une transaction
  const toggleTransactionInfo = (index) => {
    const updatedInfoStates = [...transactionInfoStates];
    updatedInfoStates[index] = !updatedInfoStates[index];
    setTransactionInfoStates(updatedInfoStates);
  };

  return (
    <section className="account">
      <div className="account-container">
        <div className="account-content-wrapper">
          <h3 className="account-title">{title}</h3>
          <p className="account-amount">{amount}</p>
          <p className="account-amount-description">{description}</p>
        </div>
        <div className="account-content-right cta">
          {/* Icône pour afficher ou masquer les détails des transactions */}
          <p className="chevron" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'X' : '>'}
          </p>
        </div>
      </div>

      {/* Affichage des détails des transactions si isOpen est true */}
      {isOpen && (
        <div className="transaction-container">
          <div className="transaction-top">
            <p>Date</p>
            <p>Description</p>
            <p>Amount</p>
            <p>Balance</p>
          </div>
          {operationData.map((transaction, index) => (
            <div className="transaction-details" key={index}>
              {/* Détails d'une transaction */}
              <div className="transaction" onClick={() => toggleTransactionInfo(index)}>
                <p>{transaction.date}</p>
                <p>{transaction.description}</p>
                <p>{transaction.amount}</p>
                <p>{transaction.balance}</p>
                <i className="fa-solid fa-chevron-down" onClick={handleTransactionInputSave}></i>
              </div>
              {/* Affichage ou masquage des informations détaillées de la transaction */}
              {transactionInfoStates[index] && (
                <div className="transaction-info">
                  <div className="transaction-info-details">
                    <p>Transaction type</p>
                    <p>Category</p>
                    <p>Note</p>
                  </div>
                  <div className="transaction-info-list">
                    {/* Informations spécifiques à la transaction */}
                    <div>
                      <p>Electronic</p>
                    </div>
                    <div>
                      {/* Bloc pour éditer ou afficher la première note */}
                      {isOpenPencil ? (
                        <p>
                          {transactionInputText}
                          <i
                            className="fa-solid fa-pencil"
                            onClick={() => setIsOpenPencil(!isOpenPencil)}
                          ></i>
                        </p>
                      ) : (
                        <div>
                          <input
                            type="text"
                            className="transaction-input"
                            value={transactionInputText}
                            onChange={handleTransactionInputChange}
                          />
                          <i
                            className="fa-solid fa-check"
                            onClick={() => {
                              handleTransactionInputSave();
                              setIsOpenPencil(!isOpenPencil);
                            }}
                          ></i>
                        </div>
                      )}
                    </div>
                    <div>
                      {/* Bloc pour éditer ou afficher la deuxième note */}
                      {isOpenPencil2 ? (
                        <p>
                          {transactionInputText2}
                          <i
                            className="fa-solid fa-pencil"
                            onClick={() => setIsOpenPencil2(!isOpenPencil2)}
                          ></i>
                        </p>
                      ) : (
                        <div>
                          <input
                            type="text"
                            className="transaction-input"
                            value={transactionInputText2}
                            onChange={handleTransactionInputChange2}
                          />
                          <i
                            className="fa-solid fa-check"
                            onClick={() => {
                              handleTransactionInputSave2();
                              setIsOpenPencil2(!isOpenPencil2);
                            }}
                          ></i>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
