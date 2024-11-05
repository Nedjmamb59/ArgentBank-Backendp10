import React, { useState } from 'react';
import transactionsData from '../../assets/data/transaction';


export default function Transaction({ title, amount, description }) {
  const [isOpen, setIsOpen] = useState(false);
  const [transactionInfoStates, setTransactionInfoStates] = useState(
    Array(transactionsData.length).fill(false)
  );
  const [isOpenPencil, setIsOpenPencil] = useState(true);
  const [isOpenPencil2, setIsOpenPencil2] = useState(true);
  const [transactionInputText, setTransactionInputText] = useState(
    localStorage.getItem('transactionInputText') || ''
  );
  const [transactionInputText2, setTransactionInputText2] = useState(
    localStorage.getItem('transactionInputText2') || ''
  );

  const handleTransactionInputChange = (e) => {
    setTransactionInputText(e.target.value);
  };

  const handleTransactionInputSave = () => {
    localStorage.setItem('transactionInputText', transactionInputText);
  };

  const handleTransactionInputChange2 = (e) => {
    setTransactionInputText2(e.target.value);
  };

  const handleTransactionInputSave2 = () => {
    localStorage.setItem('transactionInputText2', transactionInputText2);
  };

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
          <p className="chevron" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'X' : '>'}
          </p>
        </div>
      </div>

      {isOpen && (
        <div className="transaction-container">
          <div className="transaction-top">
            <p>Date</p>
            <p>Description</p>
            <p>Amount</p>
            <p>Balance</p>
          </div>
          {transactionsData.map((transaction, index) => (
            <div className="transaction-details" key={index}>
              <div className="transaction" key={index} onClick={() => toggleTransactionInfo(index)}>
                <p>{transaction.date}</p>
                <p>{transaction.description}</p>
                <p>{transaction.amount}</p>
                <p>{transaction.balance}</p>
                <i className="fa-solid fa-chevron-down" onClick={handleTransactionInputSave}></i>
              </div>
              {transactionInfoStates[index] && (
                <div className="transaction-info">
                  <div className="transaction-info-details">
                    <p>Transaction type</p>
                    <p>Category</p>
                    <p>Note</p>
                  </div>
                  <div className="transaction-info-list">
                    <div>
                      <p>Electronic</p>
                    </div>
                    <div>
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
